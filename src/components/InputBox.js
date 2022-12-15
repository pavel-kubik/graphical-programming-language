import './InputBox.css';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const InputBox = ({
  input,
  setInput,
  testInput,
  setTestInput,
  url,
  session,
  dataTabIndex,
  setDataTabIndex,
}) => {
  const handlerChangeInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handlerChangeTestInput = (event) => {
    event.preventDefault();
    setTestInput(event.target.value);
  };

  const handleLoadData = (event) => {
    event.preventDefault();
    // number fo days from 1/12/2022
    const day = Math.round(
      (new Date() - new Date(2022, 11, 1)) / (1000 * 60 * 60 * 24) + 1
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
      <Tabs
        selectedIndex={dataTabIndex}
        onSelect={(index) => setDataTabIndex(index)}
      >
        <TabList>
          <Tab>Main data</Tab>
          <Tab>Test data</Tab>
        </TabList>
        <TabPanel>
          <textarea
            placeholder="Put input"
            value={input}
            onChange={handlerChangeInput}
          ></textarea>
          <div className="Load" onClick={handleLoadData}>
            Load data from AoC
          </div>
        </TabPanel>
        <TabPanel>
          <textarea
            placeholder="Put test input"
            value={testInput}
            onChange={handlerChangeTestInput}
          ></textarea>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default InputBox;
