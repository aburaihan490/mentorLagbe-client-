<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This file is partially managed

- The block above is rewritten by `next dev` (see `node_modules/next/dist/server/lib/generate-agent-files.js`). With `experimental.agentFeedback: true` in `next.config.ts`, `next dev` also appends a `<!-- BEGIN:nextjs-agent-feedback -->` block here — commit both instead of deleting them.

## Repo layout

- Client-only Next.js 16.4.6 App Router + Turbopack, React 19, strict TS. Alias `@/*` → `src/*`. `README.md` is untouched create-next-app boilerplate.
- `../server` is a separate git repo (Express 5, MongoDB, Stripe) serving `/api/v1` on port 4000; no workspace tooling links the repos.
- Auth is the exception to "client-only": Next talks to MongoDB directly through Better Auth (`src/lib/auth.ts`, db `mentorlagbe`). The Express `/auth` router is a stub, not the auth backend.

## Commands

- `npm run dev`; `npm run lint` (whole repo; single file: `npx eslint src/path/file.tsx`); `npx tsc --noEmit` (no npm script).
- `npm run build` runs TS and **prerenders `/` by calling the Express API** — start `../server` on port 4000 first, or it fails with `prerender-error` on `/`.
- No test suite, Prettier, editorconfig, or CI. Verify with `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Environment

- `.env` (gitignored) needs `BACKEND_BASE_URL` (e.g. `http://localhost:4000/api/v1`), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URL`, and `NEXT_PUBLIC_IMAGEDB_URL` (ImgBB key; note the `IMAGEDB` spelling).
- `../server` needs its own `.env` (`PORT`, `MONGODB_URL`, `CLIENT_URL`) and must listen on 4000; data pages fail without it.

## Data flow

- Server components fetch via `src/qurey/` — misspelled on purpose, don't rename. Files are `server-only` and call `${BACKEND_BASE_URL}/tuition/...`.
- `getTuitions` response includes `{ data, pagination }`. Filters/pagination live in URL searchParams: `TuitionFilter` (client) resets `page` on change; `TuitionList` (async server component) refetches and renders `Pagination`.
- Auth: Better Auth is mounted at `src/app/api/auth/[...all]/route.ts`; client code uses `authClient` (`src/lib/auth-client.ts`); never add a runtime import of `src/lib/auth.ts` to a client component (module-scope `MongoClient`). Sign-up uploads a required <2MB image to ImgBB, then calls `signUp.email` with `role` (`Student`/`Tutor`). Sign-in and Navbar are wired to `authClient` (`signIn.email`, `useSession`, `signOut`; toasts via `react-hot-toast`, `Toaster` in the root layout), but the tuition `[id]` page still passes `userRole={'Student'}` hardcoded to `TuitionDetails` — apply-gating ignores the real session.
- `ApplyTuitionModal` POSTs to `/api/applications`, which exists in neither repo — expect a 404.

## Next 16 gotchas

- `params` / `searchParams` are **Promises** — await them. Prefer generated `PageProps<'/route'>` / `LayoutProps<'/route'>` (see `src/app/layout.tsx`).
- `.next/types` and `.next/dev/types` are in the tsconfig include. Errors pointing into `.next/types/validator.ts` ("File … is not a module") usually mean a route file isn't a module (e.g. an empty `page.tsx`), not a generated-type problem.

## Styling / UI

- Tailwind v4, CSS-first: no `tailwind.config` or `postcss.config`; theme lives in `src/app/globals.css`, and `next.config.ts` routes `*.css` through `@tailwindcss/turbopack`.
- shadcn style is `base-nova` → **Base UI** (`@base-ui/react`), not Radix. Add with `npx shadcn add <component>`; primitives in `src/components/ui`. `cn` comes from the `cn` npm package (re-exported by `src/lib/utils.ts`), not clsx/tailwind-merge.
