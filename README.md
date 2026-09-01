# CCIT Simulation

A marketing and case-study website for **PT CCIT Group Indonesia**, an engineering consulting firm specializing in Computational Fluid Dynamics (CFD) and thermal-fluid simulation.

## Tech stack

- [TanStack Start](https://tanstack.com/start) – full-stack React framework
- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Supabase](https://supabase.com/) – auth, database, and storage

## Development

Requires [Bun](https://bun.sh/) (or Node.js with npm).

```sh
bun install
bun run dev
```

The dev server starts on `http://localhost:8080` by default.

## Build

```sh
bun run build
```

## Environment variables

Server-side variables (do not prefix with `VITE_`):

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET` (optional, for cron/auth endpoints)
- `CRON_SECRET_PREVIOUS` (optional, for secret rotation)

Client-side variables must use the `VITE_` prefix.

## Deployment

This project is configured for a standard TanStack Start build. The default Nitro target is a Cloudflare Worker-compatible runtime; adjust the Nitro preset in `vite.config.ts` or your host's build settings if you deploy to Node.js, Vercel, or another platform.
