import Image from "next/image";
import type { Block } from "./blocks";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={block.id}
                className="border-l-2 border-circuit-green pl-4 pt-1 font-display text-xl font-bold leading-snug text-white sm:text-2xl"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={block.id}
                className="whitespace-pre-wrap text-[15px] leading-7 text-white/70 sm:text-base sm:leading-8"
              >
                {block.text}
              </p>
            );

          case "image":
            return block.url ? (
              <figure key={block.id}>
                <div className="relative w-full overflow-hidden rounded-2xl border border-circuit-border">
                  {/* Images come from Supabase Storage; any host is allowed at runtime, see next.config.mjs */}
                  <Image
                    src={block.url}
                    alt={block.caption || ""}
                    width={1200}
                    height={675}
                    className="h-auto w-full object-cover"
                    unoptimized
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-xs text-white/40">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            ) : null;

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="rounded-r-xl border-l-2 border-circuit-green bg-circuit-green/[0.04] px-5 py-4 text-sm italic leading-7 text-white/75 sm:text-base sm:leading-8"
              >
                {block.text}
              </blockquote>
            );

          case "list":
            return (
              <ul
                key={block.id}
                className="list-disc space-y-3 pl-6 text-[15px] leading-7 text-white/70 marker:text-circuit-green sm:text-base sm:leading-8"
              >
                {block.items
                  .filter((item) => item.trim())
                  .map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
              </ul>
            );

          case "divider":
            return (
              <hr key={block.id} className="border-circuit-border" />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
