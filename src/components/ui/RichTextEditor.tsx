"use client";

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { TiptapToolbar } from './TiptapToolbar';

interface RichTextEditorProps {
  content: string;
  onChange: (richText: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [, setForceUpdate] = useState(0);

    
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    onSelectionUpdate() {
      setForceUpdate(v => v + 1);
    },
    editorProps: {
      attributes: {
        class: 'max-w-none focus:outline-none',
      },
    },
  });

 

  return (
    <div className="rounded-lg border border-slate-300 bg-white text-black">
      <TiptapToolbar editor={editor} />
      <div className="max-h-[500px] min-h-[300px] overflow-y-auto custom-scrollbar-light p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}