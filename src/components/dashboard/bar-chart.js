import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Chart from "react-apexcharts";
import "./index.scss";
import { IconButton } from "@mui/material";
import { exportToExcel } from "../../utils";

const CustomBarChart = ({ title, data = [], xDataKey, bDataKey }) => {
  const width = window.innerWidth > 420 ? 500 : 300;

  const state = {
    options: {
      labels: data.map(d => d[xDataKey]),
      legend: {
        position: "right"
      },
      xaxis: {
        categories: data.map(d => d[xDataKey])
      },
      dataLabels: {
        enabled: window.innerWidth > 450,
        formatter: function(val) {
          return val.toFixed(2) + "%";
        }
      }
    },
    series: [
      {
        name: "count",
        data: data.map(d => d[bDataKey])
      }
    ],
    labels: data.map(d => d[xDataKey])
  };

  return (
    <div className='bar-chart-container'>
      <div className='title'>
        {title}
        <IconButton
          disabled={data.length === 0}
          onClick={() => exportToExcel(data, xDataKey)}
        >
          <DownloadIcon />
        </IconButton>
      </div>
      {data.length > 0 ? (
        <div>
          <Chart
            type='bar'
            options={state}
            labels={state.labels}
            series={state.series}
            height={300}
            width={window.innerWidth > 450 ? undefined : width || "400px"}
          />
        </div>
      ) : (
        <div
          style={{
            width: `${width}px`
          }}
        >
          No data to display
        </div>
      )}
    </div>
  );
};

export default CustomBarChart;
