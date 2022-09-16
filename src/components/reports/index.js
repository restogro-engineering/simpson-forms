import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { REPORT_TABS } from "./helper";
import "./index.scss";
import TicketReports from "./tickets";
import SEReports from "./se-reports";
import OEMReports from "./oem-reports";

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

const Reports = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant='scrollable'>
          {REPORT_TABS.map(tab => {
            return <Tab label={tab} />;
          })}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <TicketReports />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SEReports />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OEMReports />
      </TabPanel>
    </Box>
  );
};

export default Reports;
