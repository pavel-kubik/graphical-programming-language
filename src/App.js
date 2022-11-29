import { useState } from 'react';
import './App.css';
import Builder from './components/Builder/Builder';
import CodeMap from './components/CodeMap';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  const [codeMap, setCodeMap] = useState([]);

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

  return (
    <div className="App">
      <header className="App-header">Graphical Programming Language</header>
      <InputBox />
      <Builder addCode={addCode} />
      <CodeMap codeMap={codeMap} editLine={editLine} />
      <OutputBox />
    </div>
  );
}

export default App;
