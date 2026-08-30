import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/SectionHeading";
import {
  adminListCategories,
  adminCreateCategory,
  adminRenameCategory,
  adminDeleteCategory,
} from "@/lib/case-studies.functions";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  head: () => ({
    meta: [
      { title: "Case study categories | CCIT Simulation" },
      {
        name: "description",
        content: "Create, rename and remove the categories used by CCIT Simulation case studies.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Case study categories | CCIT Simulation" },
      {
        property: "og:description",
        content: "Manage the categories used by CCIT Simulation case studies.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CategoriesPage,
});

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

function CategoriesPage() {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const list = useQuery({ queryKey: ["admin-categories"], queryFn: () => adminListCategories() });
  const create = useServerFn(adminCreateCategory);
  const rename = useServerFn(adminRenameCategory);
  const remove = useServerFn(adminDeleteCategory);

  function refresh() {
    void queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    void queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
  }

  const createMutation = useMutation({
    mutationFn: (name: string) => create({ data: { name } }),
    onSuccess: () => {
      toast.success("Category added.");
      setNewName("");
      refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const renameMutation = useMutation({
    mutationFn: (vars: { id: string; name: string }) => rename({ data: vars }),
    onSuccess: () => {
      toast.success("Category renamed.");
      setEditingId(null);
      refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Category deleted.");
      refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Case study categories"
        body="Keep the category labels consistent across every published case study."
      />

      <section className="mx-auto max-w-3xl px-5 pb-20 pt-10">
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to dashboard
        </Link>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            createMutation.mutate(newName);
          }}
          className="mt-6 flex flex-wrap gap-2 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <input
            required
            maxLength={60}
            value={newName}
            placeholder="e.g. Wind Engineering"
            onChange={(event) => setNewName(event.target.value)}
            className={`min-w-[240px] flex-1 ${inputClass}`}
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            Add category
          </button>
        </form>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-bold text-ink">All categories</h2>
          {list.isLoading && <p className="mt-4 text-sm text-muted-foreground">Loading…</p>}
          {list.error && (
            <p className="mt-4 text-sm text-primary">
              {(list.error as Error).message === "Forbidden"
                ? "You need admin access to manage categories."
                : (list.error as Error).message}
            </p>
          )}
          {list.data?.items.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">No categories yet.</p>
          )}

          <ul className="mt-4 divide-y divide-border">
            {(list.data?.items ?? []).map((item) => (
              <li key={item.id} className="flex flex-wrap items-center gap-3 py-4">
                {editingId === item.id ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      renameMutation.mutate({ id: item.id, name: editingName });
                    }}
                    className="flex flex-1 flex-wrap gap-2"
                  >
                    <input
                      required
                      autoFocus
                      maxLength={60}
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                      className={`min-w-[200px] flex-1 ${inputClass}`}
                    />
                    <button
                      type="submit"
                      disabled={renameMutation.isPending}
                      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{item.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.usageCount === 0
                          ? "Not used yet"
                          : `${item.usageCount} case stud${item.usageCount === 1 ? "y" : "ies"}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(item.id);
                        setEditingName(item.name);
                      }}
                      className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-ink hover:bg-muted"
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete the category "${item.name}"?`)) {
                          deleteMutation.mutate(item.id);
                        }
                      }}
                      className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-primary hover:bg-muted"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
