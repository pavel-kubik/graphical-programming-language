import './RunDebugBar.css';

const RunDebugBar = ({ runHandler, mode, handleChangeMode }) => {
  return (
    <div className="RunDebugBar">
      <div onClick={handleChangeMode}>{mode}</div>
      <div className="Run" onClick={runHandler}>
        Run
      </div>
    </div>
  );
};

export default RunDebugBar;
