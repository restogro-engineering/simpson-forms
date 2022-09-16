import React from "react";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import "./index.scss";

const ICON_STYLE = {
  color: "#A18BF6",
  fontSize: 100
};

const ICON_STYLE_2 = {
  color: "#FA8A6B",
  fontSize: 100
};

const MeanTimeCards = ({ title, resolveCount = {}, closedCount = {} }) => {
  return (
    <div className='mean-time-summary'>
      <div className='title'>{title}</div>
      <div className='mean-time-card'>
        <div className='left-s'>
          <div className='label-count'>
            <div className='count'>{resolveCount.count || 0}</div>
            <div className='label'>Resolve</div>
          </div>
          <div className='graph'>
            <BarChartOutlinedIcon style={ICON_STYLE} />
          </div>
        </div>

        <div className='right-s'>
          <div className='label-count'>
            <div className='count'>{closedCount.count || 0}</div>
            <div className='label'>Close</div>
          </div>
          <div className='graph'>
            <BarChartOutlinedIcon style={ICON_STYLE_2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeanTimeCards;
