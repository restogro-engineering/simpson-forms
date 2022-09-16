import React from "react";
import { Pagination } from "@mui/material";
import "./index.scss";

const SiTable = ({ header, data, pageCount, onClick, onChange }) => {
  return (
    <div className='si-table-container'>
      <div className='si-header'>
        <div className='si-row'>
          {header.map(h => {
            return (
              <div className='si-cell' key={h.label}>
                {h.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className='si-body'>
        {data.map((rowData,index) => {
          return (
            <div className='si-row' key={index}>
              {header.map((h, i) => {
                if (h.render) {
                  return h.render(rowData, onClick);
                }
                return (
                  <div className='si-cell' key={i}>
                    {rowData[h.key]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className='si-pagination'>
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            color='primary'
            onChange={onChange}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default SiTable;
