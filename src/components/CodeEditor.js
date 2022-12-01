import './CodeEditor.css';

const CodeEditor = ({ code, setCode }) => {
  const handleChangeCode = (event) => {
    event.preventDefault();
    setCode(event.target.value);
  };

  return (
    <div className="CodeEditor">
      <textarea placeholder="Place your code here" onChange={handleChangeCode}>
        {code}
      </textarea>
    </div>
  );
};

export default CodeEditor;
