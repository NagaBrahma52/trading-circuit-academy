export type Block =
  | { id: string; type: "heading"; text: string }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "image"; url: string; caption?: string }
  | { id: string; type: "quote"; text: string }
  | { id: string; type: "list"; items: string[] }
  | { id: string; type: "divider" };

export type BlockType = Block["type"];

export const BLOCK_LABELS: Record<BlockType, string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  image: "Image",
  quote: "Quote",
  list: "Bullet list",
  divider: "Divider",
};

export function emptyBlock(type: BlockType): Block {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now() + Math.random());

  switch (type) {
    case "heading":
      return { id, type, text: "" };
    case "paragraph":
      return { id, type, text: "" };
    case "image":
      return { id, type, url: "", caption: "" };
    case "quote":
      return { id, type, text: "" };
    case "list":
      return { id, type, items: [""] };
    case "divider":
      return { id, type };
  }
}
