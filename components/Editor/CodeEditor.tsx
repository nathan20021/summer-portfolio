"use client";
import React from "react";

import Editor from "@monaco-editor/react";

interface MarkdownEditorProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ code, setCode }) => {
  const options = {
    wordWrap: "on",
    fontSize: 13,
    lineNumbers: "off",
    minimap: {
      enabled: false,
    },
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="markdown"
      defaultValue={code}
      onChange={(e) => setCode(e)}
      options={options}
      theme="vs-dark"
    />
  );
};

export default MarkdownEditor;

// react-textarea-code-editor
