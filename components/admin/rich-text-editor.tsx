"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const toolbarButtonBase =
  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150";
const toolbarButtonInactive = "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300";
const toolbarButtonActive = "border-[#7C3AED] bg-violet-50 text-[#7C3AED]";

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] rounded-b-2xl border-x border-b border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 focus:outline-none prose prose-sm max-w-none"
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
    return <div className="min-h-[240px] rounded-2xl border border-slate-200 bg-slate-50 animate-pulse" />;
  }

  return (
    <div className="space-y-0">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1.5 px-3 py-2.5 border border-slate-200 rounded-t-2xl bg-slate-50">
        <button
          type="button"
          className={`${toolbarButtonBase} ${editor.isActive("bold") ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >Bold</button>
        <button
          type="button"
          className={`${toolbarButtonBase} ${editor.isActive("italic") ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >Italic</button>
        <button
          type="button"
          className={`${toolbarButtonBase} ${editor.isActive("heading", { level: 2 }) ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >H2</button>
        <button
          type="button"
          className={`${toolbarButtonBase} ${editor.isActive("heading", { level: 3 }) ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >H3</button>
        <button
          type="button"
          className={`${toolbarButtonBase} ${editor.isActive("bulletList") ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >• List</button>
        <button
          type="button"
          className={`${toolbarButtonBase} ${editor.isActive("orderedList") ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >1. List</button>
        <button
          type="button"
          className={`${toolbarButtonBase} ${!editor.isActive("heading") && !editor.isActive("bulletList") ? toolbarButtonActive : toolbarButtonInactive}`}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >¶ Para</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
