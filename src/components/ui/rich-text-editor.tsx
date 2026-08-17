'use client';

import React, { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Undo,
  Redo,
  RemoveFormatting,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write a clear, detailed description of your service...',
  minHeight = '240px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="w-full border border-[#E4E4E7] rounded-[10px] overflow-hidden bg-white shadow-xs">
      {/* Rich Editor Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-white border-b border-[#E4E4E7] flex-wrap select-none">
        {/* Headings Selector */}
        <select
          onChange={(e) => {
            const tag = e.target.value;
            if (tag) {
              execCommand('formatBlock', `<${tag}>`);
            }
          }}
          defaultValue="p"
          className="h-8 px-2.5 bg-[#F8F9FF] border border-[#E4E4E7] rounded-md font-rubik text-[13px] text-[#121111] outline-none cursor-pointer mr-1"
        >
          <option value="p">Normal Text</option>
          <option value="h3">Heading 1</option>
          <option value="h4">Heading 2</option>
          <option value="h5">Heading 3</option>
        </select>

        <div className="w-[1px] h-5 bg-[#E4E4E7] mx-1" />

        {/* Text Styling */}
        <button
          type="button"
          onClick={() => execCommand('bold')}
          title="Bold (Ctrl+B)"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          title="Italic (Ctrl+I)"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          title="Underline (Ctrl+U)"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('strikeThrough')}
          title="Strikethrough"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[#E4E4E7] mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          title="Bullet List"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          title="Numbered List"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[#E4E4E7] mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          title="Align Left"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          title="Align Center"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          title="Align Right"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-[#E4E4E7] mx-1" />

        {/* Quote & Utilities */}
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          title="Quote"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('undo')}
          title="Undo"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('redo')}
          title="Redo"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <Redo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('removeFormat')}
          title="Clear Formatting"
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F7F8FC] text-[#121111] transition cursor-pointer"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Editable Canvas Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{ minHeight }}
        data-placeholder={placeholder}
        className="w-full p-4 font-rubik text-[14px] leading-[22px] text-[#121111] outline-none focus:outline-none overflow-y-auto empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-1 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#F36922] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-600"
      />
    </div>
  );
}
