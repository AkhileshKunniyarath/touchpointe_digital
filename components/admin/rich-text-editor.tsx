"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const toolbarButtonClass =
  "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-white/10";

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] rounded-[24px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white focus:outline-none"
      }
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    }
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", false);
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="min-h-[240px] rounded-[24px] border border-white/10 bg-slate-950/70" />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </button>
        <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().setParagraph().run()}>
          Paragraph
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
