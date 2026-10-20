import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/profile";
import ArticleEditor from "../../ArticleEditor";
import { updateArticle } from "../../actions";
import type { Block } from "@/components/library/blocks";

export default async function EditLibraryArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    redirect("/dashboard/library");
  }

  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("id, title, excerpt, cover_image_url, blocks, published")
    .eq("id", params.id)
    .single();

  if (!article) {
    notFound();
  }

  const updateWithId = updateArticle.bind(null, article.id);

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-circuit-green">Digital Library / Editor</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white">Edit article</h1>
        <p className="mt-2 text-sm text-white/50">Refine your lesson, then save or publish your changes.</p>
      </div>
      <ArticleEditor
        action={updateWithId}
        submitLabel="Save changes"
        initial={{
          title: article.title,
          excerpt: article.excerpt ?? "",
          coverImageUrl: article.cover_image_url ?? "",
          published: article.published,
          blocks: (article.blocks as Block[]) ?? [],
        }}
      />
    </div>
  );
}
