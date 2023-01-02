import './RunDebugBar.css';

const RunDebugBar = ({
  runHandler,
  debugHandler,
  killHandler,
  mode,
  handleChangeMode,
}) => {
  return (
    <div className="RunDebugBar">
      <div className="Button" onClick={handleChangeMode}>{mode}</div>
      <div className="Run Button" onClick={runHandler}>
        Run
      </div>
      <div
        className="Run Button"
        onClick={debugHandler}
        title="Open Dev Console | F12"
      >
        Debug
      </div>
      <div className="Kill Button" onClick={killHandler}>
        Kill
      </div>
    </div>
  );
};

export default RunDebugBar;
