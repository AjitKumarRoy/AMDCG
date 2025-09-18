"use client";

import type { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, Heading1, Heading2, Heading3, List, ListOrdered, Link as LinkIcon } from 'lucide-react';

export function TiptapToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the URL', previousUrl);

    // If the user cancels the prompt
    if (url === null) {
      return;
    }

    // If the user clears the URL, remove the link and its styles
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().unsetUnderline().unsetItalic().run();
      return;
    }

     // Otherwise, set the link and apply underline and italic styles
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).setUnderline().setItalic().run();
  };

  const Button = ({ onClick, children, isActive }: { onClick: () => void, children: React.ReactNode, isActive?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-amber-500 text-white' : 'text-slate-700 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-t-lg border-b border-slate-300 bg-slate-100">
      <Button onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold className="h-4 w-4" /></Button>
      <Button onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic className="h-4 w-4" /></Button>
      <Button onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}><Underline className="h-4 w-4" /></Button>
      <Button onClick={setLink} isActive={editor.isActive('link')}><LinkIcon className="h-4 w-4" /></Button>
      <div className="h-6 w-px bg-slate-300" />
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}><Heading1 className="h-4 w-4" /></Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading2 className="h-4 w-4" /></Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}><Heading3 className="h-4 w-4" /></Button>
      <div className="h-6 w-px bg-slate-300" />
      <Button onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List className="h-4 w-4" /></Button>
      <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}><ListOrdered className="h-4 w-4" /></Button>
    </div>
  );
}