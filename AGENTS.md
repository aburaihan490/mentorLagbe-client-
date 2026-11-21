<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo layout

- This repo is only the **client** (git root = this directory, branch `main`). `../server` is a *separate git repo*: Express 5 + MongoDB + Stripe API. No workspace tooling ties them together — nothing to install or build across both.
- Next.js 16.4.6 App Router + Turbopack, React 19, strict TS. Path alias `@/*` → `./src/*`.

## Commands

- `npm run dev` (dev server), `npm run build` (runs TS typecheck and fails on errors), `npm run lint` (flat-config ESLint). Single file: `npx eslint src/path/file.tsx`.
- Typecheck: `npx tsc --noEmit` — there is no npm script for it.
- **No test suite, no Prettier/editorconfig, no CI.** Verify with: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Full-stack environment

- `.env` (gitignored) holds one var: `BACKEND_BASE_URL=http://localhost:4000/api/v1`.
- Pages that fetch data fail unless `../server` is running: `npm run dev` there (nodemon), needs its own `.env` (`PORT`, `MONGODB_URL`, `CLIENT_URL`) and must listen on port 4000.

## Data flow

- Server components fetch via `src/qurey/` — **misspelled on purpose, that's the real directory name**; don't "fix" it. Files start with `import 'server-only'` and call `${BACKEND_BASE_URL}/...` endpoints (`/tuition/...`, `/auth/...`).
- There are no Next route handlers yet (`src/app/api` doesn't exist). Client components that POST (e.g. `ApplyTuitionModal` → `/api/applications`) target endpoints that aren't implemented.
- Tuition filtering convention: `TuitionFilter` is `'use client'` and rewrites URL searchParams with `router.push` (deleting `page` on filter change); the page passes awaited `searchParams` to the server component `TuitionList`, which fetches and renders `Pagination`.

## Next 16 gotchas

- `params` / `searchParams` are **Promises** — await them. Prefer generated `PageProps<'/route'>` / `LayoutProps<'/route'>` over hand-rolled prop types (see `src/app/layout.tsx`).
- Generated types in `.next/types` and `.next/dev/types` are in the tsconfig include. If `tsc` or `build` errors point into `.next/types/validator.ts` (e.g. "File … is not a module"), the real cause is a route file that isn't a module — an empty `page.tsx` — not the generated file.

## Styling / UI

- Tailwind CSS **v4, CSS-first**: there is no `tailwind.config` or `postcss.config`; `next.config.ts` maps `*.css` to the `@tailwindcss/turbopack` loader and the theme lives in `src/app/globals.css`.
- shadcn style is `base-nova` → components use **Base UI** (`@base-ui/react`), *not* Radix. Add components with `npx shadcn add <component>`; primitives live in `src/components/ui`. `cn` comes from the `cn` npm package (re-exported by `src/lib/utils.ts`), not clsx/tailwind-merge.
