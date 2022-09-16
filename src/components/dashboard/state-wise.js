import React from "react";
import CustomBarChart from "./bar-chart";
import IndiaMap from "../../core/india-map";
import "./index.scss";

const StateWise = ({ dashboardDetails, indiaMapData }) => {
  return (
    <div className='other-info-container'>
      <CustomBarChart
        title='State wise overview'
        data={dashboardDetails.stateWiseCounts || []}
        xDataKey='name'
        bDataKey='count'
      />
      <IndiaMap
        data={indiaMapData}
        title='State wise overview'
        downloadingData={dashboardDetails.stateWiseCounts || []}
      />
    </div>
  );
};

export default StateWise;
