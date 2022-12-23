import './Codding.css';

import { useState } from 'react';
import Builder from './Builder/Builder';
import CodeEditor from './CodeEditor';
import CodeMap from './CodeMap';
import InputBox from './InputBox';
import OutputBox from './OutputBox';
import RunDebugBar from './RunDebugBar';
import { DATA_TEMPLATE, WORKER_TEMPLATE } from '../const';
import { useEffect } from 'react';

const Codding = ({ url, session, code, setCode }) => {
  // eslint-disable-next-line no-unused-vars
  const modes = ['code-js', 'code-ruby', 'graphical'];
  const [mode, setMode] = useState(modes[0]);
  const [worker, setWorker] = useState(null);

  //graph editor (code map)
  const [codeMap, setCodeMap] = useState([]);

  // data
  const [input, setInput] = useState(() => {
    const savedInput = localStorage.getItem('input');
    return savedInput || 'my\ndata';
  });
  useEffect(() => {
    localStorage.setItem('input', input);
  }, [input]);
  const [testInput, setTestInput] = useState(() => {
    const savedTestInput = localStorage.getItem('testInput');
    return savedTestInput || 'my\ntest\ndata';
  });
  useEffect(() => {
    localStorage.setItem('testInput', testInput);
  }, [testInput]);
  const [output, setOutput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [dataTabIndex, setDataTabIndex] = useState(() => {
    const savedDataTabIndex = Number(localStorage.getItem('dataTabIndex'));
    return savedDataTabIndex || 0;
  });
  useEffect(() => {
    localStorage.setItem('dataTabIndex', dataTabIndex);
  }, [dataTabIndex]);

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

    console.log('Code to run:' + codeForRun);
    const worker = new Worker(
      URL.createObjectURL(
        new Blob([codeForRun], { type: 'application/javascript' })
      )
    );
    worker.onmessage = (e) => {
      console.log('Message received from worker');
      console.log('OUTPUT: ' + e.data);
      dataTabIndex === 0 ? setOutput(e.data) : setTestOutput(e.data);
    };
    worker.onerror = (e) => {
      console.log('Error received from worker');
      const error = 'Line ' + e.lineno + ' col ' + e.colno + ' ' + e.message;
      dataTabIndex === 0 ? setOutput(error) : setTestOutput(error);
    };
    setWorker(worker);
    worker.postMessage('start');
  };

  const runHandler = () => {
    run(`${code}\n${WORKER_TEMPLATE}`);
  };

  const debugHandler = () => {
    run(
      `debugger;\n${code}\ndebugger;\n//END\n\n${WORKER_TEMPLATE}\n//@ sourceURL=code.js`
    );
  };

  const killHandler = () => {
    if (worker) {
      worker.terminate();
      setWorker(null);
    }
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
        killHandler={killHandler}
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
