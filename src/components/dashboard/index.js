/** @format */

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overview from './overview';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import OtherInfo from './other-info';
import { formatIndiaMapData } from './helper';
import StateWise from './state-wise';
import { useSearchParams } from 'react-router-dom';
import TrendOverview from './trend-overview';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [engineDashboardDetails, setEngineDashboardDetails] = useState({});
  const [ticketCounts, setTicketCounts] = useState({});
  const [engineTicketCounts, setEngineTicketCounts] = useState({});
  const [indiaMapData, setIndiaMapData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  let data = searchParams.get('index');

  React.useEffect(() => {
    handleChange(0, +data);
  }, [data]);

  const loadData = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.DASHBOARD}`, null).then(
      (response) => {
        setDashboardDetails(response);
        if (response.stateWiseCounts) {
          setIndiaMapData(formatIndiaMapData(response.stateWiseCounts));
        }
      }
    );
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.DASHBOARD}`, null, {
      engineReplacement: true,
    }).then((response) => {
      setEngineDashboardDetails(response);
    });

    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.TICKETS_COUNTS}`,
      null
    ).then((response) => {
      setTicketCounts(response);
    });
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.TICKETS_COUNTS}`,
      null,
      {
        engineReplacement: true,
      }
    ).then((response) => {
      setEngineTicketCounts(response);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabPanel value={value} index={0}>
        <Overview
          dashboardDetails={dashboardDetails}
          ticketCounts={ticketCounts}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Overview
          dashboardDetails={engineDashboardDetails}
          ticketCounts={engineTicketCounts}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OtherInfo dashboardDetails={dashboardDetails} index={2} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StateWise
          dashboardDetails={dashboardDetails}
          indiaMapData={indiaMapData}
        />
      </TabPanel>

      {[4, 5, 6, 7].map((data) => {
        return (
          <TabPanel value={value} index={data}>
            <OtherInfo dashboardDetails={dashboardDetails} index={data} />
          </TabPanel>
        );
      })}
      <TabPanel value={value} index={8}>
        <TrendOverview />
      </TabPanel>
    </Box>
  );
};

export default Dashboard;
