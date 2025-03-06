"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import parse from "html-react-parser";

const TinyMCEEditor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), {
  ssr: false,
});

interface IEditorProps {
  name: string;
  value?: string;
  onChange: (content: string) => void;
}

export default function EditorComponent({ name, value, onChange }: IEditorProps) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Editor
    apiKey='dyhzxi5d81d8lcvi68w56aedkrqpjwzb0d5hy2qqcl4vz250'
    onInit={(_evt, editor) => editorRef.current = editor}
    onEditorChange={(content) => {
      onChange(content)
    }}
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help | image',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      appendTo: "body",
    }}
  />
  );
}
