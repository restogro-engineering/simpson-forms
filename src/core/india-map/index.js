import React from "react";
import { VectorMap } from "react-jvectormap";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import "./index.scss";
import { exportToExcel } from "../../utils";

const IndiaMap = ({ data = {}, title, downloadingData }) => {
  const onRegionTipShow = function(e, el, code) {
    el.html(el.html() + " (Count - " + data[code] + ")");
  };

  return (
    <div className='india-map-card-container'>
      <div className='title'>
        {title}{" "}
        <IconButton
          disabled={downloadingData.length === 0}
          onClick={() => exportToExcel(downloadingData, "state")}
        >
          <DownloadIcon />
        </IconButton>
      </div>

      <div className='india-map-container'>
        <VectorMap
          map={"in_mill"}
          backgroundColor='transparent'
          focusOn={{
            x: 10,
            y: 10,
            scale: 0,
            animate: false
          }}
          zoomOnScroll={true}
          containerStyle={{
            width: "500px",
            height: "500px"
          }}
          onRegionClick={countryCode => console.log(countryCode)} //gets the country                         code
          onRegionTipShow={onRegionTipShow}
          containerClassName='map'
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc" // onclick colour of state
            }
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: data,
                scale: ["#C8EEFF", "#51459d"], //color range
                normalizeFunction: "polynomial"
              }
            ]
          }}
          labels={{
            regions: {
              render: function(code) {
                return data[code];
              }
            }
          }}
        />
      </div>
    </div>
  );
};
export default IndiaMap;
