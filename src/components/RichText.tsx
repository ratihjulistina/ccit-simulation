import type { ReactNode } from "react";
import type { RichTextDoc, RichTextNode } from "@/lib/case-studies.types";

function renderMarks(node: RichTextNode, children: ReactNode): ReactNode {
  let out = children;
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") out = <strong className="font-semibold text-ink">{out}</strong>;
    else if (mark.type === "italic") out = <em>{out}</em>;
    else if (mark.type === "code")
      out = <code className="rounded bg-muted px-1 py-0.5 text-[0.9em]">{out}</code>;
    else if (mark.type === "link") {
      const href = String((mark.attrs?.["href"] as string) ?? "#");
      out = (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2"
        >
          {out}
        </a>
      );
    }
  }
  return out;
}

function renderNodes(nodes: RichTextNode[] | undefined): ReactNode {
  return (nodes ?? []).map((node, index) => <RenderNode key={index} node={node} />);
}

function RenderNode({ node }: { node: RichTextNode }): ReactNode {
  const children = renderNodes(node.content);

  switch (node.type) {
    case "text":
      return renderMarks(node, node.text ?? "");
    case "paragraph":
      return <p className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</p>;
    case "heading": {
      const level = Number(node.attrs?.["level"] ?? 2);
      if (level <= 2) return <h2 className="mt-8 text-xl font-bold text-ink">{children}</h2>;
      return <h3 className="mt-6 text-base font-semibold text-ink">{children}</h3>;
    }
    case "bulletList":
      return (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-base leading-relaxed text-muted-foreground">
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-base leading-relaxed text-muted-foreground">
          {children}
        </ol>
      );
    case "listItem":
      return <li className="[&>p]:mt-0">{children}</li>;
    case "blockquote":
      return (
        <blockquote className="mt-6 rounded-xl border-l-2 border-primary bg-muted/60 p-4">
          {children}
        </blockquote>
      );
    case "codeBlock":
      return (
        <pre className="mt-4 overflow-x-auto rounded-xl bg-muted p-4 text-sm">
          <code>{children}</code>
        </pre>
      );
    case "horizontalRule":
      return <hr className="mt-8 border-border" />;
    case "hardBreak":
      return <br />;
    default:
      return <>{children}</>;
  }
}

export function RichText({ document }: { document: RichTextDoc }) {
  return <>{renderNodes(document.content)}</>;
}
