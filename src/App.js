import { useState } from 'react';
import './App.css';
import Builder from './components/Builder/Builder';
import CodeEditor from './components/CodeEditor';
import CodeMap from './components/CodeMap';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import RunDebugBar from './components/RunDebugBar';

function App() {
  // eslint-disable-next-line no-unused-vars
  const modes = ['code-js', 'code-ruby', 'graphical'];
  const [mode, setMode] = useState(modes[0]);
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
    // eslint-disable-next-line no-eval
    const out = eval(header + code + footer);
    console.log('Out: ' + out);
    setOutput(out);
  };

  const handleChangeMode = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  return (
    <div className="App">
      <header className="App-header">Graphical Programming Language</header>
      <InputBox input={input} setInput={setInput} />
      <RunDebugBar
        runHandler={runHandler}
        mode={mode}
        handleChangeMode={handleChangeMode}
      />
      {mode === 'graphical' && (
        <>
          <Builder addCode={addCode} />
          <CodeMap codeMap={codeMap} editLine={editLine} />
        </>
      )}
      {mode.startsWith('code-') && (
        <>
          <CodeEditor code={code} setCode={setCode} />
        </>
      )}
      <OutputBox output={output} />
    </div>
  );
}

export default App;
