import { useState } from 'react';
import './App.css';
import Builder from './components/Builder/Builder';
import CodeEditor from './components/CodeEditor';
import CodeMap from './components/CodeMap';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import RunDebugBar from './components/RunDebugBar';

function App() {
  const [mode, setMode] = useState('code');
  //const [mode, setMode] = useState('graph');

  //graph editor (code map)
  const [codeMap, setCodeMap] = useState([]);

  //code editor
  const [code, setCode] = useState('');

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const addCode = (code) => {
    setCodeMap([...codeMap, code]);
  };

  const editLine = (lineIndex, line) => {
    setCodeMap(
      codeMap.map((oldLine, i) => {
        if (i === lineIndex) {
          return line;
        } else {
          return oldLine;
        }
      })
    );
  };

  const escapeNewLines = (code) => {
    return code.split('\n').join('\\n');
  };

  const runHandler = () => {
    const header = `const run = (input) => {\n`;
    const footer = `\n}\nrun("${escapeNewLines(input)}")`;
    console.log(header + code + footer);
    const out = eval(header + code + footer);
    console.log('Out: ' + out);
    setOutput(out);
  };

  return (
    <div className="App">
      <header className="App-header">Graphical Programming Language</header>
      <InputBox input={input} setInput={setInput} />
      {mode === 'graph' && (
        <>
          <Builder addCode={addCode} />
          <CodeMap codeMap={codeMap} editLine={editLine} />
        </>
      )}
      {mode === 'code' && (
        <>
          <RunDebugBar runHandler={runHandler} />
          <CodeEditor code={code} setCode={setCode} />
        </>
      )}
      <OutputBox output={output} />
    </div>
  );
}

export default App;
