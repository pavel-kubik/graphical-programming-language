import './RunDebugBar.css';

const RunDebugBar = ({ runHandler, debugHandler, mode, handleChangeMode }) => {
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
    </div>
  );
};

export default RunDebugBar;
