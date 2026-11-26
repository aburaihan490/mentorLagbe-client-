<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Managed file

- `next dev` rewrites the block above. With `experimental.agentFeedback: true` in `next.config.ts`, it also appends a `<!-- BEGIN:nextjs-agent-feedback -->` block. Don't delete either — commit them with your work or dev restores the diff.

## Shape of the repo

- Next 16.4.6 App Router + Turbopack, React 19, strict TS, alias `@/*` → `src/*`. `README.md` is untouched create-next-app boilerplate. No test suite, Prettier, editorconfig, or CI.
- `../server` is a separate git repo (Express 5 + MongoDB + Stripe) serving `/api/v1` on port 4000; no workspace tooling links them — run both by hand.
- The Next app also talks to the same Mongo DB (`mentorlagbe`) directly. The Express `/auth` router is a stub, not the auth backend.

## Commands

- `npm run dev`; `npm run lint` (whole repo; single file: `npx eslint src/path/file.tsx`); `npx tsc --noEmit` (no npm script). Server: `cd ../server && npm run dev` (nodemon).
- `npm run build` typechecks and prerenders `/` (`FeaturedTuitions` → `getTuitions()` → Express). Start `../server` on 4000 first or the build fails with `prerender-error` on `/`.
- Verify in order: `npm run lint` → `npx tsc --noEmit` → `npm run build`.

## Environment (both `.env` files are gitignored)

- Client: `BACKEND_BASE_URL` (server-side Express base, e.g. `http://localhost:4000/api/v1`), `NEXT_PUBLIC_BACKEND_BASE_URL` (same base for browser fetches), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URL`, `NEXT_PUBLIC_IMAGEDB_URL` (ImgBB key — note the `IMAGEDB` spelling).
- Server: `PORT`, `MONGODB_URL`, `CLIENT_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. `config/env.js` throws at startup if any is missing, so the server won't boot without Stripe keys.
- Stripe webhook is `POST /api/webhooks/stripe` on the server — outside `/api/v1`, registered with `express.raw` before `express.json` in `app.js`. Local testing: `stripe listen --forward-to http://localhost:4000/api/webhooks/stripe`.

## Data flow (three paths — follow the surrounding code)

- Public tuitions: server-only `src/qurey/` (misspelled on purpose; don't rename) calls `${BACKEND_BASE_URL}/tuition/...`. `getTuitions` returns `{ data, pagination }`; filters/pagination live in URL searchParams (`TuitionFilter` resets `page`, `TuitionList` refetches, renders `Pagination`).
- Older dashboard managers fetch `${NEXT_PUBLIC_BACKEND_BASE_URL}/...` from the browser with a Better Auth JWT from `authClient.token()` sent as `Authorization: Bearer ...` (see `MyApplicationsManager`, `TutorTuitionsManager`, `ApplicantsManager`, payments pages). Newer ones fetch client-local `/api/dashboard/*` routes that use `getApiUser()` + `getDb()` to query Mongo directly, with no Express hop (see `AdminOverview`, `TutorOverview`).
- Checkout: `checkOutAction` (`src/action/subscription.ts`) POSTs to `${BACKEND_BASE_URL}/checkout/create-checkout-session` with a Better Auth JWT; Express creates the Stripe session, inserts a `subscriptions` row, then redirects to `/checkout/success` or `/checkout/cancel`. The webhook updates `user.subscriptionPlan`.
- `/api/applications` exists client-side (public POST writing to Mongo `applications`) but is currently unused: the apply modal POSTs to Express `/applications/student-application` with a JWT instead.

## Auth, roles, and plan

- Better Auth is mounted at `src/app/api/auth/[...all]/route.ts`; client code uses `authClient`. `src/lib/auth.ts` creates a module-scope `MongoClient` (server-only) — never add a runtime import of it to a client component; `auth-client.ts` references it only via `typeof auth` for `inferAdditionalFields`.
- Sign-up uploads a required <2MB image to ImgBB, then calls `signUp.email` with `role` (`Student`/`Tutor`). Roles are stored capitalized; normalize with `.toLowerCase()`.
- Route guards live in `src/proxy.ts` (Next 16's replacement for `middleware.ts`; there is no middleware file), matcher `/dashboard`, `/student/:path*`, `/tutor/:path*`, `/admin/:path*`. Actual pages are under `/student|/tutor|/admin/*` in the `(dashboard)` group.
- Plan value mismatch: the webhook and dashboard UI use `'premium'`, but `normalizePlan()` in `src/lib/api-auth.ts` only accepts `'pro'` — client-local API routes therefore treat premium users as `free` (2-tuition cap in `POST /api/dashboard/tuitions`). Check both values when touching plan gating.
- Sessions use a 5-hour JWT cookie cache; `/checkout/success` forces a refresh with `getSession({ query: { disableCookieCache: true } })` + `refetch()` so a changed plan becomes visible. Copy that pattern when fresh session data matters.

## Next 16 gotchas

- `params` / `searchParams` are **Promises** — await them. Prefer generated `PageProps<'/route'>` / `LayoutProps<'/route'>` (see `src/app/layout.tsx`).
- `.next/types` and `.next/dev/types` are in the tsconfig include. Errors pointing into `.next/types/validator.ts` ("File … is not a module") usually mean a route file isn't a module (e.g. an empty `page.tsx`), not a generated-type problem.

## Styling / UI

- Tailwind v4, CSS-first: no `tailwind.config` or `postcss.config`; theme lives in `src/app/globals.css`, and `next.config.ts` routes `*.css` through `@tailwindcss/turbopack`.
- shadcn style is `base-nova` → **Base UI** (`@base-ui/react`), not Radix. Add with `npx shadcn add <component>`; primitives in `src/components/ui`. `cn` comes from the `cn` npm package (re-exported by `src/lib/utils.ts`), not clsx/tailwind-merge.
