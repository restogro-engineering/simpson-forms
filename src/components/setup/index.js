/** @format */

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getOfflineData } from '../../utils/offline-services';
import { useNavigate } from 'react-router-dom';
import RecruitmentForm from './recruitement-form';
import RecruitmentForm2 from './recruitement-form2';
import './index.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (!getOfflineData('user')) {
      navigate('/login');
    }
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Form1' {...a11yProps(0)} />
          <Tab label='Form2' {...a11yProps(1)} />          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RecruitmentForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecruitmentForm2 />
      </TabPanel>     
    </Box>
  );
}
