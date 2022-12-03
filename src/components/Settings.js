import { useEffect } from 'react';
import './Settings.css';

const Settings = ({ url, session, setUrl, setSession }) => {
  const handleUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const handleSessionChanged = (event) => {
    event.preventDefault();
    setSession(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem('url', url);
  }, [url]);

  useEffect(() => {
    localStorage.setItem('session', session);
  }, [session]);

  return (
    <div className="Settings">
      <h1>Settings</h1>
      <p>URL</p>
      <input type="text" value={url} onChange={handleUrlChange} />
      <p>Session</p>
      <textarea type="text" value={session} onChange={handleSessionChanged} />
    </div>
  );
};

export default Settings;
