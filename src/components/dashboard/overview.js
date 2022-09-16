import React, { useState, useEffect } from "react";
import SummaryCards from "../../core/summary-card";
import { formatReports } from "./helper";
import TicketSummaryCards from "../../core/ticket-summary-card";
import MeanTimeCards from "../../core/mean-time-cards";
import IssueRaisingInfo from "../../core/issue-raising-info";
import "./index.scss";

const Overview = ({ dashboardDetails, ticketCounts }) => {
  const [reportsDetails, setReportsDetails] = useState({});
  useEffect(() => {
    setReportsDetails(formatReports(dashboardDetails));
  }, [dashboardDetails]);

  const { maxStateIssue, minStateIssue } = reportsDetails;

  const {
    majorAvgMttr,
    minorAvgMttr,
    majorAvgMttc,
    minorAvgMttc
  } = dashboardDetails;

  return (
    <div className='overview-container'>
      <div className='left-section'>
        <SummaryCards
          title='Max Issue Causing'
          data={reportsDetails.topIssueCausing || []}
        />
        <SummaryCards
          title='Top Issue Causing'
          data={reportsDetails.topModelHMR || []}
        />
        <TicketSummaryCards
          title='Ticket summary'
          ticketCounts={ticketCounts}
        />
      </div>
      <div className='right-section'>
        <MeanTimeCards
          title='Major Ticket Mean Time'
          resolveCount={majorAvgMttr}
          closedCount={majorAvgMttc}
        />
        <MeanTimeCards
          title='Minor Ticket Mean Time'
          resolveCount={minorAvgMttr}
          closedCount={minorAvgMttc}
        />
        <IssueRaisingInfo
          data={[
            {
              label: "Maximum issue raising state",
              ...maxStateIssue
            },
            {
              label: "Minimum issue raising state",
              ...minStateIssue
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Overview;
