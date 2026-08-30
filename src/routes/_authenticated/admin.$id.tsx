import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/SectionHeading";
import { RichTextEditor } from "@/components/RichTextEditor";
import {
  adminGetCaseStudy,
  adminSaveCaseStudy,
  adminListCategories,
} from "@/lib/case-studies.functions";
import { slugify, type RichTextDoc } from "@/lib/case-studies.types";

export const Route = createFileRoute("/_authenticated/admin/$id")({
  head: () => ({
    meta: [
      { title: "Edit case study | CCIT Simulation" },
      { name: "description", content: "Write and publish a CCIT Simulation case study." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Edit case study | CCIT Simulation" },
      { property: "og:description", content: "Write and publish a CCIT Simulation case study." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CaseStudyEditor,
});

const inputClass =
  "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

function CaseStudyEditor() {
  const { id } = useParams({ from: "/_authenticated/admin/$id" });
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [published, setPublished] = useState(false);
  const [body, setBody] = useState<RichTextDoc | null>(null);
  const [uploading, setUploading] = useState(false);

  const existing = useQuery({
    queryKey: ["admin-case-study", id],
    queryFn: () => adminGetCaseStudy({ data: { id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    const item = existing.data?.item;
    if (!item) return;
    setTitle(item.title);
    setSlug(item.slug);
    setSlugTouched(true);
    setCategory(item.category);
    setExcerpt(item.excerpt);
    setImageUrl(item.image);
    setImageAlt(item.imageAlt);
    setPublished(item.published);
    setBody(item.body);
  }, [existing.data]);

  const save = useServerFn(adminSaveCaseStudy);
  const saveMutation = useMutation({
    mutationFn: () =>
      save({
        data: {
          id: isNew ? null : id,
          slug: slug || slugify(title),
          title,
          category,
          excerpt,
          body,
          imageUrl,
          imageAlt,
          published,
        },
      }),
    onSuccess: () => {
      toast.success("Saved.");
      void queryClient.invalidateQueries();
      navigate({ to: "/admin" });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage
        .from("case-study-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      setImageUrl(`/api/public/case-study-image/${path}`);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title={isNew ? "New case study" : "Edit case study"}
        body="Write the project story: the challenge, your simulation approach, the results and the client outcome."
      />

      <section className="mx-auto max-w-4xl px-5 pb-20 pt-10">
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to dashboard
        </Link>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            saveMutation.mutate();
          }}
          className="mt-6 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-ink">
              Title
            </label>
            <input
              id="title"
              required
              maxLength={160}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (!slugTouched) setSlug(slugify(event.target.value));
              }}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="slug" className="text-sm font-semibold text-ink">
                URL slug
              </label>
              <input
                id="slug"
                required
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(slugify(event.target.value));
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-semibold text-ink">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={inputClass}
              >
                <option value="">No category</option>
                {categoryOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-muted-foreground">
                Add or rename categories on the{" "}
                <Link to="/admin/categories" className="text-primary hover:underline">
                  categories page
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="text-sm font-semibold text-ink">
              Short summary (card + search preview)
            </label>
            <textarea
              id="excerpt"
              rows={3}
              maxLength={400}
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <span className="text-sm font-semibold text-ink">Cover image</span>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={imageAlt || "Case study cover"}
                  className="h-24 w-36 rounded-xl object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleUpload(file);
                }}
                className="text-sm text-muted-foreground"
              />
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl(null)}
                  className="text-sm font-semibold text-primary"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              placeholder="Image description (for accessibility)"
              maxLength={200}
              value={imageAlt}
              onChange={(event) => setImageAlt(event.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <span className="text-sm font-semibold text-ink">Full case study</span>
            <div className="mt-2">
              <RichTextEditor value={body} onChange={setBody} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
              className="h-4 w-4 accent-[hsl(var(--primary))]"
            />
            Published (visible on the public website)
          </label>

          <button
            type="submit"
            disabled={saveMutation.isPending || uploading}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] disabled:opacity-60"
          >
            {saveMutation.isPending ? "Saving…" : "Save case study"}
          </button>
        </form>
      </section>
    </>
  );
}
