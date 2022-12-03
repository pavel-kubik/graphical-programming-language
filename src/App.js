import './App.css';
import './BurgerMenu.css';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Codding from './components/Codding';
import Settings from './components/Settings';

function App() {
  // settings
  const [url, setUrl] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('url');
    return saved || 'https://adventofcode.com/2022/day/%day%/input';
  });

  const [session, setSession] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('session');
    return saved || '123456789';
  });

  return (
    <div id="outer-container">
      <Router>
        <Menu
          right
          width="auto"
          pageWrapId={'App'}
          outerContainerId={'outer-container'}
        >
          <Link id="Codding" to="/">
            Codding
          </Link>
          <Link id="Settings" to="/settings">
            Settings
          </Link>
        </Menu>
        <div className="App">
          <header className="App-header">GraphPL</header>
          <Routes>
            <Route
              exact
              path="/"
              element={<Codding url={url} session={session} />}
            />
            <Route
              path="/settings"
              element={
                <Settings
                  url={url}
                  session={session}
                  setUrl={setUrl}
                  setSession={setSession}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
