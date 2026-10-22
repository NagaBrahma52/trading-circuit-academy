"use client";

import { useTransition } from "react";
import { deleteArticle, toggleArticlePublished } from "./actions";
import Spinner from "@/components/ui/Spinner";

export function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this article? This can't be undone.")) return;
        startTransition(async () => {
          await deleteArticle(id);
        });
      }}
      className="flex items-center gap-1.5 rounded-lg border border-red-400/15 px-3 py-2 text-xs font-semibold text-red-300/75 transition hover:border-red-400/40 hover:text-red-200 disabled:opacity-60"
    >
      {pending && <Spinner size={12} />}
      Delete
    </button>
  );
}

export function PublishToggleButton({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await toggleArticlePublished(id, !published);
        });
      }}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-60 ${
        published
          ? "border-white/10 text-white/70 hover:border-white/30"
          : "border-circuit-green/30 text-circuit-green hover:border-circuit-green/60"
      }`}
    >
      {pending && <Spinner size={12} />}
      {published ? "Unpublish" : "Publish now"}
    </button>
  );
}
