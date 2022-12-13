import './RunDebugBar.css';

const RunDebugBar = ({ runHandler, debugHandler, mode, handleChangeMode }) => {
  return (
    <div className="RunDebugBar">
      <div onClick={handleChangeMode}>{mode}</div>
      <div className="Run" onClick={runHandler}>
        Run
      </div>
      <div className="Run" onClick={debugHandler}>
        Debug
      </div>
    </div>
  );
};

export default RunDebugBar;
