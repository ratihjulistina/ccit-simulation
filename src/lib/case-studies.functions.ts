import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import type { CaseStudy } from "./case-studies.types";

// Tiptap JSON document; validated structurally by the editor, stored as jsonb.
const richTextSchema = z.any();

const inputSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes only"),
  title: z.string().trim().min(3).max(160),
  category: z.string().trim().max(60).default(""),
  excerpt: z.string().trim().max(400).default(""),
  body: richTextSchema,
  imageUrl: z.string().trim().max(500).nullable(),
  imageAlt: z.string().trim().max(200).default(""),
  published: z.boolean(),
});

export const getPublishedCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const { publicClient, mapRow } = await import("./case-studies.server");
  try {
    const { data, error } = await publicClient()
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { items: (data ?? []).map(mapRow) as CaseStudy[], error: null as string | null };
  } catch (error) {
    console.error("Failed to load case studies", error);
    return { items: [] as CaseStudy[], error: "Case studies are temporarily unavailable." };
  }
});

export const getPublishedCaseStudy = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug).slice(0, 120) }))
  .handler(async ({ data }) => {
    const { publicClient, mapRow } = await import("./case-studies.server");
    try {
      const { data: row, error } = await publicClient()
        .from("case_studies")
        .select("*")
        .eq("published", true)
        .eq("slug", data.slug)
        .maybeSingle();
      if (error) throw error;
      return { item: row ? mapRow(row) : null, error: null as string | null };
    } catch (error) {
      console.error("Failed to load case study", error);
      return { item: null as CaseStudy | null, error: "This case study is temporarily unavailable." };
    }
  });

export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    const { count } = await context.supabase
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    return { isAdmin: Boolean(data), adminCount: count ?? 0 };
  });

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw countError;
    if ((count ?? 0) > 0) throw new Error("An admin already exists. Ask them to grant you access.");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw error;
    return { ok: true };
  });

export const grantAdminByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { email: string; redirectTo?: string }) => {
    const parsed = z
      .object({
        email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
        redirectTo: z.string().url().optional(),
      })
      .safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.");
    }
    return parsed.data;
  })

  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    if (listError) throw listError;
    const email = data.email.toLowerCase();
    let target = users.users.find((user) => user.email?.toLowerCase() === email) ?? null;
    let invited = false;

    if (!target) {
      const { data: invite, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        data.redirectTo ? { redirectTo: data.redirectTo } : undefined,
      );
      if (inviteError) throw inviteError;
      target = invite.user;
      invited = true;
    }

    if (!target) throw new Error("Could not create the invitation. Please try again.");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: target.id, role: "admin" }, { onConflict: "user_id,role" });
    if (error) throw error;
    return { ok: true, email: target.email, invited };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string }) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    if (data.userId === context.userId) throw new Error("You cannot remove your own access.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) <= 1) throw new Error("At least one admin must remain.");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", "admin");
    if (error) throw error;
    return { ok: true };
  });

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");
    if (error) throw error;
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    return {
      currentUserId: context.userId,
      admins: (roles ?? []).map((role) => {
        const user = users?.users.find((item) => item.id === role.user_id);
        return {
          userId: role.user_id,
          email: user?.email ?? "unknown",
          pending: !user?.last_sign_in_at,
        };
      }),
    };
  });


export const adminListCaseStudies = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { mapRow } = await import("./case-studies.server");
    const { data, error } = await context.supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { items: (data ?? []).map(mapRow) };
  });

export const adminGetCaseStudy = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { mapRow } = await import("./case-studies.server");
    const { data: row, error } = await context.supabase
      .from("case_studies")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw error;
    return { item: row ? mapRow(row) : null };
  });

export const adminSaveCaseStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data, context }) => {
    const payload = {
      slug: data.slug,
      title: data.title,
      category: data.category,
      excerpt: data.excerpt,
      body: data.body,
      image_url: data.imageUrl,
      image_alt: data.imageAlt,
      published: data.published,
    };

    if (data.id) {
      const { data: row, error } = await context.supabase
        .from("case_studies")
        .update(payload)
        .eq("id", data.id)
        .select("id, slug")
        .single();
      if (error) throw new Error(error.message);
      return row;
    }

    const { data: row, error } = await context.supabase
      .from("case_studies")
      .insert(payload)
      .select("id, slug")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteCaseStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("case_studies").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const categoryNameSchema = z.string().trim().min(1, "Name is required").max(60);

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

export const adminListCategories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data: rows, error } = await context.supabase
      .from("case_study_categories")
      .select("id, name")
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);

    const { data: used, error: usedError } = await context.supabase
      .from("case_studies")
      .select("category");
    if (usedError) throw new Error(usedError.message);

    const counts = new Map<string, number>();
    for (const row of used ?? []) {
      const key = (row.category ?? "").trim().toLowerCase();
      if (!key) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return {
      items: (rows ?? []).map((row) => ({
        id: row.id as string,
        name: row.name as string,
        usageCount: counts.get(String(row.name).toLowerCase()) ?? 0,
      })),
    };
  });

export const adminCreateCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ name: categoryNameSchema }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("case_study_categories")
      .insert({ name: data.name });
    if (error) {
      throw new Error(
        error.code === "23505" ? "That category already exists." : error.message,
      );
    }
    return { ok: true };
  });

export const adminRenameCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid(), name: categoryNameSchema }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: current, error: readError } = await context.supabase
      .from("case_study_categories")
      .select("name")
      .eq("id", data.id)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!current) throw new Error("Category not found.");

    const { error } = await context.supabase
      .from("case_study_categories")
      .update({ name: data.name })
      .eq("id", data.id);
    if (error) {
      throw new Error(
        error.code === "23505" ? "Another category already uses that name." : error.message,
      );
    }

    if (current.name !== data.name) {
      const { error: cascadeError } = await context.supabase
        .from("case_studies")
        .update({ category: data.name })
        .eq("category", current.name);
      if (cascadeError) throw new Error(cascadeError.message);
    }

    return { ok: true };
  });

export const adminDeleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: current, error: readError } = await context.supabase
      .from("case_study_categories")
      .select("name")
      .eq("id", data.id)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!current) throw new Error("Category not found.");

    const { count, error: countError } = await context.supabase
      .from("case_studies")
      .select("id", { count: "exact", head: true })
      .eq("category", current.name);
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) > 0) {
      throw new Error(
        `${count} case study${count === 1 ? "" : "s"} still use this category. Change them first.`,
      );
    }

    const { error } = await context.supabase
      .from("case_study_categories")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
