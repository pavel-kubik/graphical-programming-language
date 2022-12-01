import './RunDebugBar.css';

const RunDebugBar = ({ runHandler }) => {
  return (
    <div className="RunDebugBar">
      <div onClick={runHandler}>Run javascript</div>
    </div>
  );
};

export default RunDebugBar;
