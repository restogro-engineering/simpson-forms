import React from "react";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import "./index.scss";

const ICON_STYLE = {
  color: "#fff"
};

const SummaryCards = ({ title, data }) => {
  return (
    <div className='summary-cards-container'>
      <div className='title'>{title}</div>
      <div className='report-card-list'>
        {data.map((item, index) => {
          return (
            <div className='report-card' key={index}>
              <div className='icon-c'>{getIcon(index)}</div>
              <div className='report-text-c'>
                <div className='title-label'>{item.label}</div>
                <div className='data' title={item.data || "-"}>
                  {item.data || "-"}
                </div>
                <div className='count'>{item.count || 0}</div>
              </div>
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
      return <OfflineBoltOutlinedIcon style={ICON_STYLE} />;
    case 1:
      return <FlareOutlinedIcon style={ICON_STYLE} />;
    case 2:
      return <AirlineStopsOutlinedIcon style={ICON_STYLE} />;
  }
};

export default SummaryCards;
