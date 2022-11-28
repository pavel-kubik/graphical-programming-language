import './App.css';
import CodeMap from './components/CodeMap';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">Graphical Programming Language</header>
      <InputBox />
      <CodeMap />
      <OutputBox />
    </div>
  );
}

export default App;
