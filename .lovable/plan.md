# Fix: admin invitation email not received

## Diagnosis (confirmed via database + email logs)

- The invited account `ratih.julistina95@gmail.com` **was created** in auth (2026-08-30 09:23 UTC), so the invite request succeeded server-side. It is unconfirmed and never signed in.
- **Zero email delivery events exist in the visible window for the entire project** — not even the owner's own confirmation email. This means auth emails (invites, confirmations) are very likely not being dispatched by the project's managed email sending, or are being silently dropped.
- A second, code-level issue in `grantAdminByEmail` (`src/lib/case-studies.functions.ts`): if the email already exists in auth, the function takes the "existing user" branch and **sends no email at all** — so re-inviting the same address silently does nothing.

## Plan

### 1. Enable managed project emails
- Turn on the project's email sending (`email_domain--toggle_project_emails`, enabled: true) so auth invite/confirmation emails are actually dispatched. (Requires your approval — this is a project setting change.)

### 2. Fix resend logic in `grantAdminByEmail`
- When the email already exists but the user has **not confirmed** their email (`email_confirmed_at` is null), resend the signup/invite confirmation email via `supabaseAdmin.auth.resend({ type: "signup", email })` instead of silently skipping.
- Return a clear status: `invited` (new), `resent` (existing unconfirmed), or `existing` (already confirmed — no email needed).

### 3. Improve the admin dashboard UI (`/admin`)
- Show each admin/invitee's status: **Active** vs **Invitation pending** (based on `last_sign_in_at` / confirmation).
- Add a **Resend invitation** button for pending invitees so you can re-trigger the email without retyping the address.
- Surface the new `resent`/`existing` statuses as toast messages instead of a generic success.

### 4. Verify end-to-end
- Resend the invitation to `ratih.julistina95@gmail.com` and confirm a delivery event appears in the email logs.
- Note: also worth checking the **spam/junk folder** for the original invite — invite links also expire (default 24h), so the original link may no longer work regardless.

## Technical details
- File changed: `src/lib/case-studies.functions.ts` (grantAdminByEmail handler), `src/routes/_authenticated/admin.index.tsx` (status column + resend button).
- Auth admin list call already returns `email_confirmed_at` / `last_sign_in_at`, so no schema changes needed.
- No database migration required.
