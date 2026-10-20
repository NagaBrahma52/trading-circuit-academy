"use client";

import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { BLOCK_LABELS, emptyBlock, type Block, type BlockType } from "@/components/library/blocks";
import type { ArticleFormState } from "./actions";

const initialState: ArticleFormState = { error: null };

type ArticleDraft = {
  title: string;
  excerpt: string;
  coverImageUrl: string;
  published: boolean;
  blocks: Block[];
};

const EMPTY_DRAFT: ArticleDraft = {
  title: "",
  excerpt: "",
  coverImageUrl: "",
  published: false,
  blocks: [],
};

export default function ArticleEditor({
  action,
  initial = EMPTY_DRAFT,
  submitLabel = "Save article",
}: {
  action: (
    prevState: ArticleFormState,
    formData: FormData
  ) => Promise<ArticleFormState>;
  initial?: ArticleDraft;
  submitLabel?: string;
}) {
  const [state, formAction] = useFormState(action, initialState);

  const [title, setTitle] = useState(initial.title);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [published, setPublished] = useState(initial.published);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);
  const [blocks, setBlocks] = useState<Block[]>(initial.blocks);
  const [uploadingCover, setUploadingCover] = useState(false);

  function addBlock(type: BlockType) {
    setBlocks((prev) => [...prev, emptyBlock(type)]);
  }

  function updateBlock(id: string, patch: Partial<Block>) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b))
    );
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      const next = index + dir;
      if (index === -1 || next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy;
    });
  }

  async function uploadImage(file: File): Promise<string | null> {
    const supabase = createClient();
    const path = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage
      .from("library-images")
      .upload(path, file);

    if (error) {
      alert(`Image upload failed: ${error.message}`);
      return null;
    }

    const { data } = supabase.storage
      .from("library-images")
      .getPublicUrl(path);
    return data.publicUrl;
  }

  return (
    <form action={formAction} className="d-flex flex-column gap-4" style={{ maxWidth: 760 }}>
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
      <input type="hidden" name="coverImageUrl" value={coverImageUrl} />

      <div className="rounded-xl border border-circuit-border bg-circuit-card text-white p-4 p-sm-5">
        <div className="d-flex flex-column gap-3">
          <div>
            <label className="form-label small fw-semibold">Title</label>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label small fw-semibold">
              Excerpt (shown on the Digital Library listing)
            </label>
            <input
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label small fw-semibold">
              Cover image (optional)
            </label>
            {coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverImageUrl}
                alt=""
                className="mb-2 rounded"
                style={{ maxHeight: 160 }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="form-control"
              disabled={uploadingCover}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadingCover(true);
                const url = await uploadImage(file);
                if (url) setCoverImageUrl(url);
                setUploadingCover(false);
              }}
            />
            {uploadingCover && (
              <p className="small text-muted mt-1 mb-0">Uploading...</p>
            )}
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="published"
              name="published"
              className="form-check-input"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label htmlFor="published" className="form-check-label small">
              Published (visible on the public Digital Library)
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-circuit-border bg-circuit-card text-white p-4 p-sm-5">
        <h2 className="h6 fw-bold mb-3">Content blocks</h2>

        <div className="d-flex flex-column gap-3">
          {blocks.map((block, i) => (
            <BlockEditor
              key={block.id}
              block={block}
              isFirst={i === 0}
              isLast={i === blocks.length - 1}
              onChange={(patch) => updateBlock(block.id, patch)}
              onRemove={() => removeBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, -1)}
              onMoveDown={() => moveBlock(block.id, 1)}
              uploadImage={uploadImage}
            />
          ))}

          {blocks.length === 0 && (
            <p className="text-muted small mb-0">
              No blocks yet — add a heading, paragraph, image, quote, or list
              below.
            </p>
          )}
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4">
          {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="btn btn-light btn-sm border"
            >
              + {BLOCK_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {state.error && <p className="text-danger small mb-0">{state.error}</p>}

      <SubmitButton label={submitLabel} />
    </form>
  );
}

function BlockEditor({
  block,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  uploadImage,
}: {
  block: Block;
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<Block>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  uploadImage: (file: File) => Promise<string | null>;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border rounded-lg p-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="badge text-bg-light border small">
          {BLOCK_LABELS[block.type]}
        </span>
        <div className="d-flex gap-1">
          <button
            type="button"
            disabled={isFirst}
            onClick={onMoveUp}
            className="btn btn-light btn-sm border"
            title="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={onMoveDown}
            className="btn btn-light btn-sm border"
            title="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="btn btn-light btn-sm border text-danger"
          >
            Remove
          </button>
        </div>
      </div>

      {block.type === "heading" && (
        <input
          className="form-control"
          placeholder="Heading text"
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      )}

      {block.type === "paragraph" && (
        <textarea
          className="form-control"
          rows={4}
          placeholder="Paragraph text"
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      )}

      {block.type === "quote" && (
        <textarea
          className="form-control"
          rows={2}
          placeholder="Quote text"
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      )}

      {block.type === "list" && (
        <textarea
          className="form-control"
          rows={4}
          placeholder={"One item per line"}
          value={block.items.join("\n")}
          onChange={(e) => onChange({ items: e.target.value.split("\n") })}
        />
      )}

      {block.type === "image" && (
        <div className="d-flex flex-column gap-2">
          {block.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={block.url}
              alt=""
              className="rounded"
              style={{ maxHeight: 200 }}
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="form-control"
            disabled={uploading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              const url = await uploadImage(file);
              if (url) onChange({ url });
              setUploading(false);
            }}
          />
          {uploading && (
            <p className="small text-muted mb-0">Uploading...</p>
          )}
          <input
            className="form-control"
            placeholder="Caption (optional)"
            value={block.caption ?? ""}
            onChange={(e) => onChange({ caption: e.target.value })}
          />
        </div>
      )}

      {block.type === "divider" && (
        <p className="text-muted small mb-0">
          A horizontal divider — no content needed.
        </p>
      )}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary align-self-start"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}
