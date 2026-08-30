import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/SectionHeading";

export const Route = createFileRoute("/set-password")({
  head: () => ({
    meta: [
      { title: "Set your password | CCIT Simulation" },
      { name: "description", content: "Choose a password for your CCIT Simulation admin account." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Set your password | CCIT Simulation" },
      {
        property: "og:description",
        content: "Choose a password for your CCIT Simulation admin account.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SetPasswordPage,
});

function SetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active && session) setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) setReady(true);
    });
    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (password !== confirm) {
      toast.error("Both passwords must match.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password saved. Welcome!");
      navigate({ to: "/admin", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Team access"
        title="Set your password"
        body="Choose a password for your CCIT Simulation admin account, then you'll be taken to the dashboard."
      />

      <section className="mx-auto w-full max-w-md px-5 py-14">
        {!ready && (
          <p className="mb-4 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            Open this page from the invitation link in your email. If you arrived here directly,
            request a new link from the sign-in page.
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-ink">
              New password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="text-sm font-semibold text-ink">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={busy || !ready}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save password"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/auth" className="text-muted-foreground hover:text-primary">
            ← Back to sign in
          </Link>
        </p>
      </section>
    </>
  );
}
