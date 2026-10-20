import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Navbar from "../components/landing/Navbar";

export const revalidate = 0;

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, title, excerpt, cover_image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-circuit-bg py-16 sm:py-24">
      <div className="container-circuit">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Digital Library
        </h1>
        <p className="mt-3 text-sm text-white/55 sm:text-base">
          Breakdowns, write-ups, and lessons from Trading Circuit.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles?.length ? (
            articles.map((a) => (
              <Link
                key={a.slug}
                href={`/library/${a.slug}`}
                className="overflow-hidden rounded-2xl border border-circuit-border bg-circuit-card transition hover:border-circuit-green/40"
              >
                {a.cover_image_url ? (
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={a.cover_image_url}
                      alt={a.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-circuit-green/10 to-transparent" />
                )}
                <div className="p-6">
                  <p className="text-xs text-white/40">
                    {new Date(a.created_at).toLocaleDateString()}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold text-white">
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {a.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-white/40">
              No articles published yet.
            </p>
          )}
        </div>
      </div>
      </main>
    </>
  );
}
