import './OutputBox.css';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const OutputBox = ({ output, testOutput, dataTabIndex, setDataTabIndex }) => {
  return (
    <div className="OutputBox">
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
            disabled
            placeholder="Run program to see output"
            value={output}
          ></textarea>
        </TabPanel>
        <TabPanel>
          <textarea
            disabled
            placeholder="Run test program to see output"
            value={testOutput}
          ></textarea>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OutputBox;
