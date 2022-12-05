import './Codding.css';

import { useEffect, useState } from 'react';
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
  const [code, setCode] = useState(() => {
    // getting stored value
    const savedCode = localStorage.getItem('code');
    return savedCode || '';
  });
  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  // data
  const [input, setInput] = useState('');
  const [testInput, setTestInput] = useState('');
  const [output, setOutput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [dataTabIndex, setDataTabIndex] = useState(0);

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
    const inputCode = dataTabIndex === 0 ? input : testInput;
    const header = `const run = (input) => {\n`;
    const footer = `\n}\nrun("${escapeNewLines(inputCode)}")`;
    console.log(header + code + footer);
    // eslint-disable-next-line no-eval
    const out = eval(header + code + footer);
    console.log('Out: ' + out);
    dataTabIndex === 0 ? setOutput(out) : setTestOutput(out);
  };

  const handleChangeMode = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };

  return (
    <>
      <InputBox
        input={input}
        setInput={setInput}
        testInput={testInput}
        setTestInput={setTestInput}
        url={url}
        session={session}
        dataTabIndex={dataTabIndex}
        setDataTabIndex={setDataTabIndex}
      />
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
      <OutputBox
        output={output}
        testOutput={testOutput}
        dataTabIndex={dataTabIndex}
        setDataTabIndex={setDataTabIndex}
      />
    </>
  );
};

export default Codding;
