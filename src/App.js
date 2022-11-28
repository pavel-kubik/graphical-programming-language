import { useState } from 'react';
import './App.css';
import Builder from './components/Builder';
import CodeMap from './components/CodeMap';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  const [codeMap, setCodeMap] = useState([]);

  const addCode = (code) => {
    setCodeMap([...codeMap, code]);
  };

  return (
    <div className="App">
      <header className="App-header">Graphical Programming Language</header>
      <InputBox />
      <Builder addCode={addCode} />
      <CodeMap codeMap={codeMap} />
      <OutputBox />
    </div>
  );
}

export default App;
