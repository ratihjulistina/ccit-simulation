# Contributor notes

- Keep TanStack Start conventions: routes live in `src/routes/`, shared layouts in `src/routes/__root.tsx`, and server-only logic in `createServerFn` handlers or `*.server.ts` modules.
- Use the existing Supabase backend for auth and data. Do not expose service-role keys to the client.
- Follow the Indonesian red/white design system in `src/styles.css`; avoid hard-coded colors in components.
- Run `bun run build` before finishing non-trivial changes to catch SSR and bundling issues.
