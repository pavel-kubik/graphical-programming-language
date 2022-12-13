import './Codding.css';

import { useState } from 'react';
import Builder from './Builder/Builder';
import CodeEditor from './CodeEditor';
import CodeMap from './CodeMap';
import InputBox from './InputBox';
import OutputBox from './OutputBox';
import RunDebugBar from './RunDebugBar';
import { DATA_TEMPLATE } from '../const';

const Codding = ({ url, session, code, setCode }) => {
  // eslint-disable-next-line no-unused-vars
  const modes = ['code-js', 'code-ruby', 'graphical'];
  const [mode, setMode] = useState(modes[0]);
  //const [mode, setMode] = useState('graph');

  //graph editor (code map)
  const [codeMap, setCodeMap] = useState([]);

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

  const run = (code) => {
    const inputCode = dataTabIndex === 0 ? input : testInput;
    const codeForRun = code.replace(DATA_TEMPLATE, escapeNewLines(inputCode));
    console.log(codeForRun);
    // eslint-disable-next-line no-eval
    const out = eval(codeForRun);
    console.log('Out: ' + out);
    dataTabIndex === 0 ? setOutput(out) : setTestOutput(out);
  };

  const runHandler = () => {
    run(code);
  };

  const debugHandler = () => {
    run(
      `debugger;\n\n${code}\n\ndebugger;//end of program\n//@ sourceURL=code.js`
    );
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
        debugHandler={debugHandler}
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
