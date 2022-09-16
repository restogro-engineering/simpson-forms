/** @format */

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Sample1 from "../../../resources/icons/JUL2022_Mature_MIS.png";
import Sample2 from "../../../resources/icons/JUL2022_12_and_ 24MIS.png";
import { HOSTNAME, REST_URLS } from "../../../utils/endpoints";
import { HTTP_METHODS, invokeApi } from "../../../utils/http-service";
import "./index.scss";
import { CURRENT_ENG_DETAILS_STATE, CUR_MONTH_INDX } from "../helper";
import PastEngineReplacementTrend from "./engine-replacement-trend";
import PersonIcon from "@mui/icons-material/Person";

const TrendOverview = () => {
  const [highlights, setHighlights] = useState({});
  const [currentTrend, setCurrentTrend] = useState(CURRENT_ENG_DETAILS_STATE);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.HIGHLIGHTS}`,
      null
    ).then((response) => {
      setHighlights(response);
    });
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.CUR_YEAR_TREND}`,
      null
    ).then((response) => {
      if (response && Array.isArray(response)) {
        let sum = 0;
        response.forEach((item) => {
          Object.keys(item).forEach((key) => {
            sum += item[key];
            currentTrend.series[1].data[CUR_MONTH_INDX[key.toUpperCase()]] =
              item[key] || null;
          });
        });
        currentTrend.series[0].data[0] = sum;
        setCurrentTrend({
          ...currentTrend,
        });
        setLoading(false);
      }
    });
  };

  const { compaints = {}, engineReplacements = {} } = highlights;

  return (
    <div className="trend-overview">
      <div className="trend-header">
        <div className="pf-month">
          <div className="pf-month-info">
            <div>Manager</div>
            <div>PERFORMER OF THE MONTH</div>
          </div>
          <PersonIcon style={{ color: "#102f77", fontSize: 100 }} />
        </div>
        <img
          className="logo"
          src={require("../../../resources/icons/logo.png")}
        />
      </div>
      <div className="trend-smaples">
        <div className="img-c">
          {/* <div className="c-label1">Coming soon</div> */}
          <img className="sample-image1" src={Sample1} />
        </div>
        <div className="img-c">
          {/* <div className="c-label1">Coming soon</div> */}
          <img className="sample-image2" src={Sample2} />
        </div>
      </div>
      <div className="trend-smaples1">
        <PastEngineReplacementTrend />
      </div>
      <div className="trend-smaples">
        {!isLoading ? (
          <ReactApexChart
            options={currentTrend.options}
            series={currentTrend.series}
            type="line"
            height={350}
          />
        ) : (
          <span>Loading ...</span>
        )}
        <div className="highlights-trend">
          <div className="title">Highlights</div>
          <div className="h-row">
            <div className="data">Item</div>
            <div className="data">Day</div>
            <div className="data">Month</div>
            <div className="data">Year</div>
          </div>
          <div className="h-row">
            <div className="data">Complaints</div>
            <div className="data">{compaints.day}</div>
            <div className="data">{compaints.month}</div>
            <div className="data">{compaints.year}</div>
          </div>
          <div className="h-row">
            <div className="data">Engine Replacements</div>
            <div className="data">{engineReplacements.day}</div>
            <div className="data">{engineReplacements.month}</div>
            <div className="data">{engineReplacements.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendOverview;
