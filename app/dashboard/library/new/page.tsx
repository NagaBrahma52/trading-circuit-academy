import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/profile";
import ArticleEditor from "../ArticleEditor";
import { createArticle } from "../actions";

export default async function NewLibraryArticlePage() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") redirect("/dashboard/library");

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-circuit-green">Digital Library / Editor</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white">Write an article</h1>
        <p className="mt-2 text-sm text-white/50">Create a polished lesson for the Trading Circuit community.</p>
      </div>
      <ArticleEditor action={createArticle} submitLabel="Save article" />
    </div>
  );
}
