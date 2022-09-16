import React from "react";
import Chart from "react-apexcharts";
import "./index.scss";

const CustomPiChart = ({ title, data = [], xDataKey, bDataKey }) => {
  const width = window.innerWidth > 420 ? 500 : 300;

  const state = {
    options: {
      labels: data.map(d => d[xDataKey]),
      legend: {
        position: "right"
      },
      dataLabels: {
        enabled: window.innerWidth > 450,
        formatter: function(val) {
          return val.toFixed(2) + "%";
        }
      }
    },
    series: data.map(d => d[bDataKey]),
    labels: data.map(d => d[xDataKey])
  };

  return (
    <div className='pic-chart-container'>
      <div className='title'>{title}</div>
      {data.length > 0 ? (
        <div>
          <Chart
            options={state}
            labels={state.labels}
            series={state.series}
            type='donut'
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

export default CustomPiChart;
