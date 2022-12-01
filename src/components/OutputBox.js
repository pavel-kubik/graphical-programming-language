import './OutputBox.css';

const OutputBox = ({ output }) => {
  return (
    <div className="OutputBox">
      <textarea
        disabled
        placeholder="Run program to see output"
        value={output}
      ></textarea>
    </div>
  );
};

export default OutputBox;
