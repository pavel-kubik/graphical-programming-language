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
      <div onClick={handleChangeMode}>{mode}</div>
      <div className="Run" onClick={runHandler}>
        Run
      </div>
      <div
        className="Run"
        onClick={debugHandler}
        title="Open Dev Console | F12"
      >
        Debug
      </div>
      <div className="Kill" onClick={killHandler}>
        Kill
      </div>
    </div>
  );
};

export default RunDebugBar;
