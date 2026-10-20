import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, FileText, Plus, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/profile";
import { deleteArticle } from "./actions";

export const revalidate = 0;

export default async function ManageLibraryPage() {
  const profile = await getCurrentProfile();
  const isAdmin = profile?.role === "admin";
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, cover_image_url, published, created_at")
    .order("created_at", { ascending: false });
  const visibleArticles = (articles ?? []).filter((article) => isAdmin || article.published);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="relative overflow-hidden rounded-3xl border border-circuit-border bg-circuit-card p-6 sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-circuit-green/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-circuit-green/25 bg-circuit-green/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-circuit-green"><BookOpen size={14} /> Trading Circuit Academy</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Digital <span className="text-circuit-green">Library</span></h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">A curated collection of trading lessons, strategy breakdowns, and market insights.</p>
          </div>
          {isAdmin ? (
            <Link href="/dashboard/library/new" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-circuit-green px-5 py-3 text-sm font-bold text-black transition hover:bg-circuit-green-dark"><Plus size={17} /> Write an article</Link>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-medium text-white/60"><ShieldCheck size={16} className="text-circuit-green" /> Read-only access</span>
          )}
        </div>
        <div className="relative mt-7 flex flex-wrap gap-3 border-t border-white/[0.07] pt-5 text-xs text-white/45">
          <span>{visibleArticles.length} {visibleArticles.length === 1 ? "article" : "articles"}</span><span className="text-white/20">•</span><span>{isAdmin ? "Admin publishing workspace" : "Published lessons"}</span>
        </div>
      </section>

      {isAdmin && (
        <div className="flex items-center gap-3 rounded-2xl border border-circuit-green/15 bg-circuit-green/[0.04] p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-circuit-green/10 text-circuit-green"><ShieldCheck size={19} /></span>
          <div><p className="text-sm font-semibold text-white">Administrator controls</p><p className="mt-1 text-xs leading-5 text-white/45">Only the admin can create, edit, publish, unpublish, or delete articles. Readers can browse published content only.</p></div>
        </div>
      )}

      {visibleArticles.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleArticles.map((article, index) => (
            <article key={article.id} className="group overflow-hidden rounded-2xl border border-circuit-border bg-circuit-card transition duration-300 hover:-translate-y-1 hover:border-circuit-green/35">
              <Link href={isAdmin && !article.published ? `/dashboard/library/${article.id}/edit` : `/library/${article.slug}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-circuit-green/15 via-white/[0.02] to-transparent">
                  {article.cover_image_url ? <Image src={article.cover_image_url} alt={article.title} fill unoptimized className="object-cover transition duration-500 group-hover:scale-[1.03]" /> : <div className="absolute inset-0 flex items-center justify-center"><BookOpen size={42} strokeWidth={1.1} className="text-circuit-green/45" /><span className="absolute bottom-3 right-4 font-display text-5xl font-bold text-white/[0.04]">{String(index + 1).padStart(2, "0")}</span></div>}
                  <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur ${article.published ? "border-circuit-green/25 bg-black/70 text-circuit-green" : "border-white/15 bg-black/70 text-white/65"}`}>{article.published ? "Published" : "Draft"}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/35"><FileText size={13} /><time dateTime={article.created_at}>{new Date(article.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time><span>·</span><span>Trading education</span></div>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug text-white transition group-hover:text-circuit-green">{article.title}</h2>
                  {article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">{article.excerpt}</p>}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-circuit-green">{isAdmin ? "Open article" : "Read article"}<ArrowUpRight size={15} /></span>
                </div>
              </Link>
              {isAdmin && (
                <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-3 sm:px-6">
                  <Link href={`/dashboard/library/${article.id}/edit`} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-circuit-green/30 hover:text-circuit-green">Edit article</Link>
                  <form action={async () => { "use server"; await deleteArticle(article.id); }}>
                    <button className="rounded-lg border border-red-400/15 px-3 py-2 text-xs font-semibold text-red-300/75 transition hover:border-red-400/40 hover:text-red-200">Delete</button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-circuit-border bg-circuit-card/60 px-6 py-16 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-circuit-green/20 bg-circuit-green/5 text-circuit-green"><BookOpen size={24} /></span>
          <h2 className="mt-5 font-display text-xl font-bold text-white">The next lesson starts here</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">{isAdmin ? "Create your first article to start building the academy's knowledge library." : "There are no published articles yet. Check back soon for new lessons from the academy."}</p>
          {isAdmin && <Link href="/dashboard/library/new" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-circuit-green px-4 py-3 text-sm font-bold text-black"><Plus size={16} /> Write your first article</Link>}
        </div>
      )}
    </div>
  );
}
