/** @format */

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Actions from '../actions';
import Defects from '../defects';
import Complaint from '../complaint';
import Parts from '../part';
import ServiceEngineers from '../service-engineers';
import MailingList from '../mailing-list';
import Oems from '../oems';
import OemNames from '../oem-names';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Setup = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons
          variant='scrollable'
          allowScrollButtonsMobile
        >
          <Tab label='Service Engineers' />
          <Tab label='Actions' />
          <Tab label='Defects' />
          <Tab label='Complaint' />
          <Tab label='Parts' />
          <Tab label='Oem Accounts' />
          <Tab label='Oem Names' />
          <Tab label='Mailing List' />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ServiceEngineers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Actions />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Defects />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Complaint />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Parts />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Oems />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <OemNames />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <MailingList />
      </TabPanel>
    </Box>
  );
};

export default Setup;
