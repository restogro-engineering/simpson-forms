import React from "react";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import "./index.scss";

const ICON_STYLE = {
  color: "#F98B6B",
  fontSize: 40
};

const ICON_STYLE_2 = {
  color: "#51459D",
  fontSize: 40
};

const IssueRaisingInfo = ({ data }) => {
  return (
    <div className='issue-raising-info'>
      <div className='issue-raising-info-list'>
        {data.map((item, index) => {
          return (
            <div className='issue-raising-info-card' key={index}>
              <div className='icon-label'>
                <div className='icon-c'>{getIcon(index)}</div>
                <div className='data-label'>
                  <div className='sub-title'>{item.label}</div>
                  <div className='data'>{item.name || "-"}</div>
                </div>
              </div>
              <div className='count'>{item.count || 0}</div>
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
      return <ArrowCircleUpOutlinedIcon style={ICON_STYLE} />;
    case 1:
      return <ArrowCircleDownOutlinedIcon style={ICON_STYLE_2} />;
  }
};

export default IssueRaisingInfo;
