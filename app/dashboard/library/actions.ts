"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/profile";
import type { Block } from "@/components/library/blocks";

export type ArticleFormState = { error: string | null };

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseBlocks(raw: FormDataEntryValue | null): Block[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function requireAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    throw new Error("Only admins can manage the Digital Library.");
  }
  return profile;
}

export async function createArticle(
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const published = formData.get("published") === "on";
  const blocks = parseBlocks(formData.get("blocks"));

  if (!title) {
    return { error: "Title is required." };
  }
  if (blocks.length === 0) {
    return { error: "Add at least one content block." };
  }

  const { error } = await supabase.from("articles").insert({
    title,
    slug: slugify(title),
    excerpt: excerpt || null,
    cover_image_url: coverImageUrl || null,
    blocks,
    published,
    author_id: profile.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/library");
  revalidatePath("/dashboard/library");
  redirect("/dashboard/library");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  await requireAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const published = formData.get("published") === "on";
  const blocks = parseBlocks(formData.get("blocks"));

  if (!title) {
    return { error: "Title is required." };
  }
  if (blocks.length === 0) {
    return { error: "Add at least one content block." };
  }

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      excerpt: excerpt || null,
      cover_image_url: coverImageUrl || null,
      blocks,
      published,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/library");
  revalidatePath("/dashboard/library");
  redirect("/dashboard/library");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);

  revalidatePath("/library");
  revalidatePath("/dashboard/library");
}

export async function toggleArticlePublished(id: string, nextPublished: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("articles").update({ published: nextPublished }).eq("id", id);

  revalidatePath("/library");
  revalidatePath("/dashboard/library");
}
