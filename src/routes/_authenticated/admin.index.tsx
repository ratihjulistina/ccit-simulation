import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/SectionHeading";
import {
  getMyAdminStatus,
  adminListCaseStudies,
  adminDeleteCaseStudy,
} from "@/lib/case-studies.data";

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
            <h2 className="text-lg font-bold text-ink">You don't have admin access</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              This dashboard is only available to approved team members. Contact the site owner if
              you need access.
            </p>
          </div>
        )}

        {status.data?.isAdmin && <CaseStudyList />}
      </section>
    </>
  );
}

function CaseStudyList() {
  const queryClient = useQueryClient();
  const list = useQuery({ queryKey: ["admin-case-studies"], queryFn: () => adminListCaseStudies() });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminDeleteCaseStudy(id),
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
