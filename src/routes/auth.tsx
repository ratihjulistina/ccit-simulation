import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/SectionHeading";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team sign in | CCIT Simulation" },
      { name: "description", content: "Sign in to manage CCIT Simulation case studies." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Team sign in | CCIT Simulation" },
      { property: "og:description", content: "Sign in to manage CCIT Simulation case studies." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      toast.error("Enter your email address first.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/set-password`,
      });
      if (error) throw error;
      toast.success("If that account exists, a reset link is on its way.");
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
        title="Sign in"
        body="This area is for the CCIT Simulation team. Accounts are created by invitation only."
      />

      <section className="mx-auto w-full max-w-md px-5 py-14">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "Please wait…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={busy}
            className="w-full text-center text-sm text-muted-foreground hover:text-primary disabled:opacity-60"
          >
            Forgot password?
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            ← Back to the website
          </Link>
        </p>
      </section>
    </>
  );
}

