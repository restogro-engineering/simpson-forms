import React from "react";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import "./index.scss";

const cards = [
  {
    label: "Open",
    key: "openTicketCount"
  },
  {
    label: "Without resolution",
    key: "unresolvedTicketsCount"
  },
  {
    label: "Reopened",
    key: "reopenedTicketsCount"
  },
  {
    label: "Total tickets",
    key: "totalTicketsCount"
  }
];

const TicketSummaryCards = ({ title, ticketCounts }) => {
  return (
    <div className='ticket-summary-cards'>
      <div className='title'>{title}</div>
      <div className='report-card-list'>
        {cards.map((item, index) => {
          return (
            <div className='report-card' key={index}>
              <div className='icon-label'>
                <div className='icon-c'>{getIcon(index)}</div>

                <div className='title-label'>{item.label}</div>
              </div>
              <div className='count'>{ticketCounts[item.key] || 0}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const getIcon = index => {
  switch (index) {
    case 0:
      return (
        <OfflineBoltOutlinedIcon
          style={{
            color: "#A03FBF"
          }}
        />
      );
    case 1:
      return (
        <FlareOutlinedIcon
          style={{
            color: "#51459D"
          }}
        />
      );
    case 2:
      return (
        <AirlineStopsOutlinedIcon
          style={{
            color: "#A08BF6"
          }}
        />
      );
    case 3:
      return (
        <BugReportOutlinedIcon
          style={{
            color: "#F98B6B"
          }}
        />
      );
  }
};

export default TicketSummaryCards;
