import './App.css';
import './BurgerMenu.css';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Codding from './components/Codding';
import Settings from './components/Settings';
import useVH from 'react-viewport-height';
import { CODE_TEMPLATE } from './const';

function App() {
  useVH();

  // settings
  const [url, setUrl] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('url');
    return saved || 'https://adventofcode.com/2022/day/%day%/input';
  });
  useEffect(() => {
    localStorage.setItem('url', url);
  }, [url]);

  const [session, setSession] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem('session');
    return saved || '123456789';
  });
  useEffect(() => {
    localStorage.setItem('session', session);
  }, [session]);

  //code editor
  const [code, setCode] = useState(() => {
    // getting stored value
    const savedCode = localStorage.getItem('code');
    return savedCode || CODE_TEMPLATE;
  });
  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  return (
    <>
      <script type="text/javascript">{code}</script>
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
                element={
                  <Codding
                    url={url}
                    session={session}
                    code={code}
                    setCode={setCode}
                  />
                }
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
    </>
  );
}

export default App;
