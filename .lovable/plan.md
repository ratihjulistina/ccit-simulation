# Invite-only admin access

Right now anyone can create an account on the sign-in page. This change closes that: only you (an existing admin) can add someone, and they get an email invitation to set their password and sign in.

## What changes

- Public sign-up is turned off. The `/auth` page becomes sign-in only (the "Create an account" toggle is removed), and self-registration is blocked at the account level too, so nobody can bypass the page.
- On the dashboard, "Team admins" becomes "Invite an admin": you type a colleague's email and press Invite. They receive an email invitation.
- The invitation email links to a new "Set your password" page on the site. They choose a password there and are taken straight to the dashboard, already an admin.
- Emails that already have an account are simply promoted to admin (as today) instead of being re-invited.
- The invite list shows current admins, plus pending invitations that haven't been accepted yet, so you can see who still needs to act.
- You can also remove an admin's access from that list (you cannot remove yourself, and the last admin cannot be removed).
- A "Forgot password" link is added to the sign-in page so invited admins can recover access later.

## Notes

- The invitation email uses the built-in default email template from your site's backend. If you later want it branded with CCIT colours and wording, that needs an email domain set up — we can do that as a follow-up.
- The "claim first admin" button on the dashboard stays, but becomes irrelevant once your account is admin; it only ever works when zero admins exist.

## Technical details

- `supabase--configure_auth` with `disable_signup: true` (keep anonymous users off; leave auto-confirm as-is — invited users are confirmed by accepting the invite).
- New server fn `inviteAdminByEmail` in `src/lib/case-studies.functions.ts`, replacing/wrapping `grantAdminByEmail`: verifies caller `has_role(admin)`, then via `supabaseAdmin.auth.admin`:
  - existing user → upsert `user_roles` row (current behaviour);
  - no user → `inviteUserByEmail(email, { redirectTo: ${origin}/set-password })`, then insert the admin role row for the returned user id.
- New server fn `revokeAdmin` (admin-only, refuses self and refuses when it would leave zero admins).
- `listAdmins` extended to return `pending: boolean` from each user's `email_confirmed_at` / `last_sign_in_at`.
- New public route `src/routes/set-password.tsx`: reads the invite/recovery session from the URL hash, calls `supabase.auth.updateUser({ password })`, then navigates to `/admin`. `noindex` meta.
- `src/routes/auth.tsx`: drop the sign-up mode and its state, add a "Forgot password?" action calling `resetPasswordForEmail` with `redirectTo: ${origin}/set-password`.
- `src/routes/_authenticated/admin.index.tsx`: rename the panel, wire invite + revoke mutations, show pending badge.
