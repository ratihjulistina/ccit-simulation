import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import type { ReactNode } from "react";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_n: unknown, children: ReactNode) => (
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_n: unknown, children: ReactNode) => (
      <h2 className="mt-8 text-xl font-bold text-ink">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_n: unknown, children: ReactNode) => (
      <h3 className="mt-6 text-base font-semibold text-ink">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_n: unknown, children: ReactNode) => (
      <ul className="mt-4 list-disc space-y-1 pl-5 text-base leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_n: unknown, children: ReactNode) => (
      <ol className="mt-4 list-decimal space-y-1 pl-5 text-base leading-relaxed text-muted-foreground">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_n: unknown, children: ReactNode) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_n: unknown, children: ReactNode) => (
      <blockquote className="mt-6 rounded-xl border-l-2 border-primary bg-muted/60 p-4">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

export function RichText({ document }: { document: Document }) {
  return <>{documentToReactComponents(document, options)}</>;
}
