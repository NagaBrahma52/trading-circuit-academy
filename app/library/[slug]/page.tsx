import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BlockRenderer from "@/components/library/BlockRenderer";
import type { Block } from "@/components/library/blocks";

export const revalidate = 0;

export default async function LibraryArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("id, title, excerpt, cover_image_url, blocks, published, created_at")
    .eq("id", params.slug)
    .single();

    console.log(article);
    if (!article || !article.published) notFound();

  return (
    <main className="min-h-screen bg-circuit-bg pb-20 pt-10 sm:pt-16">
      <article className="container-circuit max-w-4xl">
        <Link href="/library" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/60 transition hover:border-circuit-green/30 hover:text-circuit-green"><ArrowLeft size={14} /> All articles</Link>
        <header className="mt-8 sm:mt-12">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-circuit-green"><span className="inline-flex items-center gap-2 rounded-full border border-circuit-green/20 bg-circuit-green/5 px-3 py-1.5"><BookOpen size={13} /> Digital Library</span><span className="inline-flex items-center gap-1.5 text-white/40"><Clock3 size={13} /> {new Date(article.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.12]">{article.title}</h1>
          {article.excerpt && <p className="mt-5 max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">{article.excerpt}</p>}
        </header>

        {article.cover_image_url && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-circuit-border bg-circuit-card sm:mt-10 sm:rounded-3xl">
            <Image src={article.cover_image_url} alt={article.title} fill unoptimized priority className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        )}

        <div className="mx-auto mt-9 max-w-3xl rounded-2xl border border-circuit-border bg-circuit-card/60 px-5 py-6 sm:mt-12 sm:px-10 sm:py-10">
          <BlockRenderer blocks={(article.blocks as Block[]) ?? []} />
          <div className="mt-10 border-t border-white/[0.08] pt-6"><Link href="/library" className="inline-flex items-center gap-2 text-sm font-semibold text-circuit-green transition hover:text-white"><ArrowLeft size={15} /> Continue exploring the library</Link></div>
        </div>
      </article>
    </main>
  );
}
