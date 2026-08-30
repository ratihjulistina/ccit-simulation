# Fix "Email not confirmed" on admin sign-in

## What's happening
Your signup worked, but email confirmation is enabled: new accounts must click a confirmation link in an email before they can sign in. The confirmation email may be in spam, or delayed — and for a small internal team tool, this extra step adds little security.

## Plan
1. Turn on auto-confirm for email signups in the backend auth settings, so new accounts are confirmed immediately and can sign in right away.
2. Confirm your existing account (the one already created) so you can sign in without waiting for the email.
3. Keep the signup flow as-is — after this change, "create account" leads straight to sign-in with no email step.

Alternative, if you'd rather keep confirmation emails: you click the link in the signup email instead — but then every future teammate must do the same, and deliverability depends on email setup. Auto-confirm is the recommended option here.

## Technical details
- `configure_auth` with `auto_confirm_email: true` (no other settings changed).
- Update the existing unconfirmed user row via SQL (`email_confirmed_at`) so ratihjulistina@gmail.com can sign in immediately.
