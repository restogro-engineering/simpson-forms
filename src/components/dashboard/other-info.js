/** @format */

import React, { useState, useEffect } from 'react';
import CustomBarChart from './bar-chart';
import './index.scss';
import CustomPiChart from './pi-chart';
import { HMR_RANGE_MAP } from './helper';

const mapping = {
  2: {
    title: 'OEM counts overview',
    xDataKey: 'name',
    bDataKey: 'count',
    dataKey: 'oemWiseCounts',
  },
  4: {
    title: 'Model wise counts',
    xDataKey: 'engineModal',
    bDataKey: 'count',
    dataKey: 'engineModalWiseCounts',
  },
  5: {
    title: 'HMR counts overview',
    xDataKey: 'hmr',
    bDataKey: 'count',
    dataKey: 'hmrWiseSummary',
  },
  6: {
    title: 'LIST Wise overview',
    xDataKey: 'listNo',
    bDataKey: 'count',
    dataKey: 'listNoWiseCounts',
  },
  7: {
    title: 'Part counts overview',
    xDataKey: 'part',
    bDataKey: 'count',
    dataKey: 'partWiseCounts',
  },   
};

const OtherInfo = ({ dashboardDetails, index }) => {
  const [reportsDetails, setReportsDetails] = useState({});
  useEffect(() => {
    let hmrWiseSummary = [];
    if (dashboardDetails.hmrWiseCounts) {
      hmrWiseSummary = formtHMRData(dashboardDetails.hmrWiseCounts);
    }
    setReportsDetails({
      ...dashboardDetails,
      hmrWiseSummary,
    });
  }, [dashboardDetails]);

  return (
    <div className='other-info-container'>
      <CustomBarChart
        title={mapping[index].title}
        data={reportsDetails[mapping[index].dataKey] || []}
        xDataKey={mapping[index].xDataKey}
        bDataKey={mapping[index].bDataKey}
      />
      <CustomPiChart
        title={mapping[index].title}
        data={(reportsDetails[mapping[index].dataKey] || []).slice(0, 10)}
        xDataKey={mapping[index].xDataKey}
        bDataKey={mapping[index].bDataKey}
      />
    </div>
  );
};

export default OtherInfo;

const formtHMRData = (hmrWiseCounts) => {
  let hmrWiseSummary = [];
  if (Object.keys(hmrWiseCounts || {}).length > 0) {
    Object.keys(hmrWiseCounts || {}).forEach((key) => {
      hmrWiseSummary.push({
        hmr: HMR_RANGE_MAP[key] || '',
        count: hmrWiseCounts[key] || 0,
      });
    });
  }
  return hmrWiseSummary;
};
