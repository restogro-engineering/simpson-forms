import React from "react";
import "./index.scss";

const TimeLine = ({ children, displayLine, className = "" }) => {
  return (
    <div className={`${className} time-line-c`}>
      <div className='dot'>
        <div className={displayLine ? "line" : "no-line"}>
          <div className='component'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
