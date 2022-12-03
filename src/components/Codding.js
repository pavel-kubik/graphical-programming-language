import './Codding.css';

import { useState } from 'react';
import Builder from './Builder/Builder';
import CodeEditor from './CodeEditor';
import CodeMap from './CodeMap';
import InputBox from './InputBox';
import OutputBox from './OutputBox';
import RunDebugBar from './RunDebugBar';

const Codding = ({ url, session }) => {
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
    <>
      <InputBox input={input} setInput={setInput} url={url} session={session} />
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
    </>
  );
};

export default Codding;
