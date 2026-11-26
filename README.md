# MentorLagbe (client)

A tuition & mentorship marketplace where students browse and apply to tutor listings, tutors post and manage listings, and admins approve listings, manage users, and review subscription payments.

This repository is the **Next.js frontend**. It works together with a sibling Express API at [`../server`](../server), but they are separate git repositories — no workspace tooling links them.

## Features

- **Public**: landing page with featured tuitions, searchable/filterable/paginated tuition listings, tuition details with an apply modal, and pricing.
- **Students**: sign up as `Student`, apply to approved tuitions, track application status, view subscription payments.
- **Tutors**: sign up as `Tutor`, post tuitions (free plan is capped at 2 listings), edit/toggle/delete listings, review and respond to applicants.
- **Admins**: manage users and roles, approve/reject tuition listings, view platform stats and Stripe transactions.
- **Auth & billing**: email/password auth with role selection and profile photo upload, Better Auth JWT sessions, Stripe subscription checkout with a signed webhook that activates the `premium` plan.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19, strict TypeScript
- Tailwind CSS v4 (CSS-first config) + shadcn components using the Base UI (`@base-ui/react`) style
- Better Auth with the MongoDB adapter; JWT plugin
- MongoDB (native driver) for direct reads/writes and for auth
- Stripe for subscriptions (checkout session created in the Express API)
- `react-hot-toast` for notifications

## Prerequisites

- Node.js 20+ and npm
- A MongoDB instance (database name: `mentorlagbe`)
- An ImgBB API key (for sign-up image uploads)
- Stripe API keys and the Stripe CLI (for webhooks)
- The sibling `../server` Express repo, installed and configured

## Setup

1. Install dependencies in both repos:

   ```bash
   npm install
   cd ../server && npm install && cd ../client
   ```

2. Create `client/.env` (gitignored):

   | Variable | Purpose |
   | --- | --- |
   | `BACKEND_BASE_URL` | Server-side Express base URL, e.g. `http://localhost:4000/api/v1` |
   | `NEXT_PUBLIC_BACKEND_BASE_URL` | Same base URL, used by browser-side fetches |
   | `BETTER_AUTH_SECRET` | Secret used to sign auth tokens |
   | `BETTER_AUTH_URL` | Public app URL, e.g. `http://localhost:3000` |
   | `MONGODB_URL` | MongoDB connection string |
   | `NEXT_PUBLIC_IMAGEDB_URL` | ImgBB API key (the spelling is `IMAGEDB`, not `IMAGEBB`) |

3. Create `server/.env` (gitignored):

   | Variable | Purpose |
   | --- | --- |
   | `PORT` | API port, normally `4000` |
   | `MONGODB_URL` | Same MongoDB connection string as the client |
   | `CLIENT_URL` | Frontend URL, e.g. `http://localhost:3000` (also used as Stripe redirect base) |
   | `STRIPE_SECRET_KEY` | Stripe secret key |
   | `STRIPE_WEBHOOK_SECRET` | Signing secret for the webhook endpoint |

   The server throws on startup if any of these are missing.

4. For local Stripe events, forward webhooks to the server (the endpoint is `POST /api/webhooks/stripe`, outside `/api/v1`):

   ```bash
   stripe listen --forward-to http://localhost:4000/api/webhooks/stripe
   ```

## Running locally

Start the API first, then the frontend:

```bash
# terminal 1
cd ../server && npm run dev

# terminal 2
npm run dev
```

The app runs at http://localhost:3000 and talks to the API at `http://localhost:4000/api/v1`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server (Turbopack) |
| `npm run build` | Production build; typechecks and prerenders pages |
| `npm start` | Serve the production build |
| `npm run lint` | Lint the whole repo (`npx eslint src/path/file.tsx` for one file) |
| `npx tsc --noEmit` | Typecheck (no npm script) |

There is no test suite, formatter config, or CI. A sensible verification order is `npm run lint` → `npx tsc --noEmit` → `npm run build`.

Note: `npm run build` prerenders `/` and fetches featured tuitions from the Express API, so the server must be running on port 4000 or the build fails with a `prerender-error` on `/`.

## Architecture notes

Data reaches the app through three paths, so check the surrounding code before adding a new fetch:

- **Server components**: `src/qurey/` (name misspelled intentionally) calls `${BACKEND_BASE_URL}/tuition/...` on the Express API. Listing filters and pagination live in URL search params.
- **Browser dashboard components**: older managers call `${NEXT_PUBLIC_BACKEND_BASE_URL}/...` directly with a Better Auth JWT (`authClient.token()`) as a bearer token. Newer managers call client-local `/api/dashboard/*` routes that read the Better Auth session and query MongoDB directly via `getDb()`.
- **Checkout**: the `checkOutAction` server action calls `${BACKEND_BASE_URL}/checkout/create-checkout-session`; Stripe redirects to `/checkout/success` or `/checkout/cancel`, and the webhook writes the plan to the user record.

Authentication is handled by Better Auth inside Next.js (`src/app/api/auth/[...all]/route.ts`), talking to MongoDB directly. The Express `/auth` router is only a stub. Role protection is implemented in `src/proxy.ts` (Next 16's `middleware.ts` replacement) for `/student`, `/tutor`, and `/admin` routes.

For deeper contributor notes and known gotchas, see [`AGENTS.md`](./AGENTS.md).
