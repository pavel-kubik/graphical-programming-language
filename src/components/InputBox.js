import './InputBox.css';

const InputBox = ({ input, setInput, url, session }) => {
  const handlerChangeInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleLoadData = (event) => {
    event.preventDefault();
    // number fo days from 1/12/2022
    const day = Math.round(
      (new Date() - new Date(2022, 11, 1)) / (1000 * 60 * 60 * 24)
    );
    // it must be called via backend because of no-cors policy on AoC domain
    fetch('/.netlify/functions/proxy', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      Headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url.replace('%day%', day),
        cookie: 'session=' + session,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInput(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="InputBox">
      <textarea
        placeholder="Put input"
        value={input}
        onChange={handlerChangeInput}
      ></textarea>
      <div className="Load" onClick={handleLoadData}>
        Load data from AoC
      </div>
    </div>
  );
};

export default InputBox;
