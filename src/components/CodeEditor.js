import './CodeEditor.css';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, language }) => {
  const handleChangeCode = (value) => {
    setCode(value);
  };

  return (
    <div className="CodeEditor">
      <Editor
        language={language
          || "javascript"
          /*|| "typescript"*/
          /*|| "ruby"*/
        }
        value={code}
        theme='vs-dark'
        defaultValue="// place your code here"
      onChange={handleChangeCode}
      />
    </div>
  );
};

export default CodeEditor;
