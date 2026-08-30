import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from "lucide-react";
import type { RichTextDoc } from "@/lib/case-studies.types";

type Props = {
  value: RichTextDoc | null;
  onChange: (doc: RichTextDoc | null) => void;
};

const emptyDoc: RichTextDoc = { type: "doc", content: [{ type: "paragraph" }] };

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value ?? emptyDoc,
    editorProps: {
      attributes: {
        class:
          "min-h-[280px] w-full rounded-b-xl bg-background px-4 py-3 text-sm leading-relaxed outline-none [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:font-semibold [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:mt-3 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_a]:text-primary [&_a]:underline",
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getJSON() as RichTextDoc);
    },
  });

  useEffect(() => {
    if (!editor || !value) return;
    const current = JSON.stringify(editor.getJSON());
    if (current !== JSON.stringify(value)) {
      editor.commands.setContent(value as never, { emitUpdate: false });
    }
    // Only sync when the incoming document identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value === null]);

  if (!editor) {
    return (
      <div className="min-h-[320px] rounded-xl border border-border bg-muted/40" aria-hidden="true" />
    );
  }

  const buttonClass = (active: boolean) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors ${
      active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
    }`;

  return (
    <div className="rounded-xl border border-border">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 p-2">
        <button
          type="button"
          className={buttonClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("blockquote"))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(editor.isActive("link"))}
          onClick={() => {
            const previous = (editor.getAttributes("link")["href"] as string) ?? "";
            const url = window.prompt("Link URL", previous);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
          aria-label="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <button
          type="button"
          className={buttonClass(false)}
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={buttonClass(false)}
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
