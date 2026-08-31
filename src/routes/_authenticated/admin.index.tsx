import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/SectionHeading";
import {
  adminListCaseStudies,
  adminDeleteCaseStudy,
  getMyAdminStatus,
  claimFirstAdmin,
  grantAdminByEmail,
  revokeAdmin,
  listAdmins,
} from "@/lib/case-studies.functions";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Case study dashboard | CCIT Simulation" },
      { name: "description", content: "Create, edit and publish CCIT Simulation case studies." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Case study dashboard | CCIT Simulation" },
      { property: "og:description", content: "Manage CCIT Simulation case studies." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const status = useQuery({ queryKey: ["admin-status"], queryFn: () => getMyAdminStatus() });
  const claim = useServerFn(claimFirstAdmin);

  const claimMutation = useMutation({
    mutationFn: () => claim(),
    onSuccess: () => {
      toast.success("You are now an admin.");
      void queryClient.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Case studies dashboard"
        body="Add new projects, edit existing ones, and control what appears on the public case studies page."
      />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-primary">
            View public page →
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink hover:bg-muted"
          >
            Sign out
          </button>
        </div>

        {status.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

        {status.data && !status.data.isAdmin && (
          <div className="rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="text-lg font-bold text-ink">You don't have admin access yet</h2>
            {status.data.adminCount === 0 ? (
              <>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  No admin exists yet. Claim the first admin account for this website.
                </p>
                <button
                  type="button"
                  onClick={() => claimMutation.mutate()}
                  disabled={claimMutation.isPending}
                  className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {claimMutation.isPending ? "Claiming…" : "Claim admin access"}
                </button>
              </>
            ) : (
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Ask an existing admin to grant your account access.
              </p>
            )}
          </div>
        )}

        {status.data?.isAdmin && (
          <>
            <CaseStudyList />
            <AdminManager />
          </>
        )}
      </section>
    </>
  );
}

function CaseStudyList() {
  const queryClient = useQueryClient();
  const list = useQuery({ queryKey: ["admin-case-studies"], queryFn: () => adminListCaseStudies() });
  const remove = useServerFn(adminDeleteCaseStudy);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Case study deleted.");
      void queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-ink">All case studies</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/categories"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink hover:bg-muted"
          >
            Manage categories
          </Link>
          <Link
            to="/admin/$id"
            params={{ id: "new" }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            + New case study
          </Link>
        </div>
      </div>

      {list.isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}
      {list.data?.items.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No case studies yet. Create your first one.
        </p>
      )}

      <ul className="mt-5 divide-y divide-border">
        {(list.data?.items ?? []).map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-3 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-ink">{item.title}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                /{item.slug} · {item.category || "no category"}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                item.published
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {item.published ? "Published" : "Draft"}
            </span>
            <Link
              to="/admin/$id"
              params={{ id: item.id }}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-ink hover:bg-muted"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Delete "${item.title}"? This cannot be undone.`)) {
                  deleteMutation.mutate(item.id);
                }
              }}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-primary hover:bg-muted"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminManager() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const admins = useQuery({ queryKey: ["admins"], queryFn: () => listAdmins() });
  const grant = useServerFn(grantAdminByEmail);
  const revoke = useServerFn(revokeAdmin);

  const grantMutation = useMutation({
    mutationFn: (value: string) =>
      grant({
        data: { email: value, redirectTo: `${window.location.origin}/set-password` },
      }),
    onSuccess: (result) => {
      toast.success(
        result.status === "invited"
          ? "Invitation email sent. They can set a password from the link."
          : result.status === "resent"
            ? "Invitation email resent. Ask them to check spam if it doesn't arrive."
            : "Admin access granted to the existing account.",
      );
      setEmail("");
      void queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const revokeMutation = useMutation({
    mutationFn: (userId: string) => revoke({ data: { userId } }),
    onSuccess: () => {
      toast.success("Admin access removed.");
      void queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h2 className="text-lg font-bold text-ink">Invite an admin</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter a colleague's email. They receive an invitation email with a link to set their
        password, then they can sign in here.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const value = email.trim();
          if (!value) {
            toast.error("Please enter a valid email address.");
            return;
          }
          grantMutation.mutate(value);
        }}

        className="mt-4 flex flex-wrap gap-2"
      >
        <input
          type="email"
          required
          value={email}
          placeholder="colleague@ccit.co.id"
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-[240px] flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={grantMutation.isPending}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {grantMutation.isPending ? "Sending…" : "Send invitation"}
        </button>
      </form>
      <ul className="mt-5 divide-y divide-border">
        {(admins.data?.admins ?? []).map((admin) => (
          <li key={admin.userId} className="flex flex-wrap items-center gap-3 py-3">
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{admin.email}</span>
            {admin.pending && (
              <>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  Invitation pending
                </span>
                <button
                  type="button"
                  disabled={grantMutation.isPending}
                  onClick={() => grantMutation.mutate(admin.email)}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-ink hover:bg-muted disabled:opacity-60"
                >
                  Resend invitation
                </button>
              </>
            )}
            {admin.userId === admins.data?.currentUserId ? (
              <span className="text-xs text-muted-foreground">You</span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Remove admin access for ${admin.email}?`)) {
                    revokeMutation.mutate(admin.userId);
                  }
                }}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-primary hover:bg-muted"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

