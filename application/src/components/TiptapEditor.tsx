// components/RichEditor.jsx
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Heading from '@tiptap/extension-heading';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import Mathematics from '@tiptap/extension-mathematics';
import 'katex/dist/katex.min.css'; // Import katex styles

import {
  MdUndo,
  MdRedo,
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
  MdFormatUnderlined,
  MdCode,
  MdLink,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdSuperscript,
  MdSubscript,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdAdd,
  MdFunctions,
} from 'react-icons/md';

import 'katex/dist/katex.min.css';

import { Editor } from '@tiptap/react';

interface RichEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
}

const RichEditor = ({ content = '', onChange, readOnly = false }: RichEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Code,
      Blockquote,
      Mathematics,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
     editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const iconButton = (onClick: () => void, icon: React.ReactNode, active: boolean = false, title: string = '') => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 ${
        active ? 'bg-gray-200' : ''
      }`}
      type="button"
    >
      {icon}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded p-2 bg-white">
      {!readOnly && (
      <div className="flex flex-wrap gap-1 border-b pb-2 mb-2 items-center">
        {iconButton(() => editor.chain().focus().undo().run(), <MdUndo /> as any, false, 'Undo')}
        {iconButton(() => editor.chain().focus().redo().run(), <MdRedo /> as any, false, 'Redo')}

        {/* Heading */}
        <select
          onChange={(e) =>
            editor.chain().focus().toggleHeading({ level: +e.target.value as any }).run()
          }
          value={
            [1, 2, 3].find((l) => editor.isActive('heading', { level: l })) || ''
          }
          className="p-2 border rounded"
        >
          <option value="">Paragraph</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        {iconButton(() => editor.chain().focus().toggleBulletList().run(), <MdFormatListBulleted /> as any, editor.isActive('bulletList'), 'Bullet List')}
        {iconButton(() => editor.chain().focus().toggleOrderedList().run(), <MdFormatListNumbered /> as any, editor.isActive('orderedList'), 'Ordered List')}
        {iconButton(() => editor.chain().focus().toggleBlockquote().run(), <MdFormatQuote /> as any, editor.isActive('blockquote'), 'Blockquote')}

        {iconButton(() => editor.chain().focus().toggleBold().run(), <MdFormatBold /> as any, editor.isActive('bold'), 'Bold')}
        {iconButton(() => editor.chain().focus().toggleItalic().run(), <MdFormatItalic /> as any, editor.isActive('italic'), 'Italic')}
        {iconButton(() => editor.chain().focus().toggleCode().run(), <MdCode /> as any, editor.isActive('code'), 'Code')}
        {iconButton(() => editor.chain().focus().toggleStrike().run(), <MdStrikethroughS /> as any, editor.isActive('strike'), 'Strikethrough')}
        {iconButton(() => editor.chain().focus().toggleUnderline().run(), <MdFormatUnderlined /> as any, editor.isActive('underline'), 'Underline')}
        {iconButton(() => editor.chain().focus().toggleLink({ href: prompt('Enter URL') || '' }).run(), <MdLink /> as any, editor.isActive('link'), 'Link')}
        {iconButton(() => editor.chain().focus().toggleSuperscript().run(), <MdSuperscript /> as any, editor.isActive('superscript'), 'Superscript')}
        {iconButton(() => editor.chain().focus().toggleSubscript().run(), <MdSubscript /> as any, editor.isActive('subscript'), 'Subscript')}

        {iconButton(() => editor.chain().focus().setTextAlign('left').run(), <MdFormatAlignLeft /> as any, editor.isActive({ textAlign: 'left' }), 'Align Left')}
        {iconButton(() => editor.chain().focus().setTextAlign('center').run(), <MdFormatAlignCenter /> as any, editor.isActive({ textAlign: 'center' }), 'Align Center')}
        {iconButton(() => editor.chain().focus().setTextAlign('right').run(), <MdFormatAlignRight /> as any, editor.isActive({ textAlign: 'right' }), 'Align Right')}
        {iconButton(() => editor.chain().focus().setTextAlign('justify').run(), <MdFormatAlignJustify /> as any, editor.isActive({ textAlign: 'justify' }), 'Justify')}
        
        {/* Math Button */}
        {iconButton(() => {
           const formula = prompt("Enter LaTeX formula (e.g. E = mc^2)");
           if (formula) {
             // In @tiptap/extension-mathematics, it parses $...$ or $$...$$. 
             // We can insert text wrapped in delimiters.
             editor.chain().focus().insertContent(`$${formula}$`).run();
           }
        }, <MdFunctions /> as any, false, 'Insert Equation')}

        {/* Custom Button */}
        {iconButton(() => alert('Add clicked'), <MdAdd /> as any, false, 'Add')}
      </div>
      )}
      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[325px] overflow-y-scroll outline-none" />
    </div>
  );
};

export default RichEditor;
