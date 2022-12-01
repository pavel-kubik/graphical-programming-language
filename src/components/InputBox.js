import './InputBox.css';

const InputBox = ({ input, setInput }) => {
  const handlerChangeInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  return (
    <div className="InputBox">
      <textarea
        placeholder="Put input"
        value={input}
        onChange={handlerChangeInput}
      ></textarea>
    </div>
  );
};

export default InputBox;
