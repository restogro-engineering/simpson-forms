/** @format */

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getOfflineData } from '../../utils/offline-services';
import { useNavigate, useParams } from 'react-router-dom';
import RecruitmentForm from './recruitement-form';
import RecruitmentForm2 from './recruitement-form2';
import './index.scss';
import RecruitmentForm3 from './recruitement-form3';

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
  const { formType = '0', mode } = useParams();
  const [value, setValue] = React.useState(+formType);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    if (mode === 'edit') {
      return;
    }
    navigate(`/form/create/1/${newValue}`)
    setValue(newValue);
  };
  const user = getOfflineData('user');
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
          <Tab label='Proposal for recruitment' {...a11yProps(0)} />
          <Tab label='Fitment proposal' {...a11yProps(1)} />
          <Tab label='New vendor codification form' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RecruitmentForm user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecruitmentForm2 user={user} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RecruitmentForm3 user={user} />
      </TabPanel>
    </Box>
  );
}
