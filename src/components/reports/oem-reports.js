import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@mui/material";
import { getHeaderConfig, OEM_REPORT_OPTIONS } from "./helper";
import SiTable from "../../core/table";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import "./index.scss";
import { exportToExcel } from "../../utils";

const OEMReports = () => {
  const [reportData, setReportData] = useState({});
  const [status, setStatus] = useState({});
  const [oem, setOem] = useState({});
  const [oems, setOems] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  });

  useEffect(() => {
    if (status.value && status.value !== "OEM_WISE") {
      loadData({
        ...filters,
        industry: status.value
      });
    } else if (status.value === "OEM_WISE" && oems.length === 0) {
      loadOems();
    } else if (status.value === "OEM_WISE" && oem.id) {
      loadData({
        ...filters,
        industry: status.value,
        oem: oem.id
      });
    }
  }, [status, oem, filters]);

  const loadData = payload => {
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.OEM_REPORTS}`, payload)
      .then(response => {
        if (response) {
          setReportData(response);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadOems = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.LIST_REPORTS_OEMS}`,
      null
    ).then(response => {
      if (response) {
        setOems(response);
      }
    });
  };

  const downloadReport = async () => {
    let payload = {
      industry: status.value,
      page: 1,
      limit: reportData.totalResults
    };
    if (status.value === "OEM_WISE" && oem.id) {
      payload.oem = oem.id;
    }
    let response = await invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.OEM_REPORTS}`,
      payload
    );
    exportToExcel(response.results || [], status.label);
  };

  return (
    <div className='reports-table'>
      <div className='filter-section'>
        <div className='left-s'>
          <div>
            <div>OEM Wise</div>
            <Select
              value={status}
              classNamePrefix='si-select'
              options={OEM_REPORT_OPTIONS}
              onChange={option => {
                setStatus(option);
                setReportData([]);
              }}
            />
          </div>
          {status.value === "OEM_WISE" && (
            <div>
              <div>Select OEM</div>
              <Select
                value={oem}
                classNamePrefix='si-select'
                options={oems}
                getOptionLabel={op => op.name}
                getOptionValue={op => op.id}
                onChange={option => {
                  setOem(option);
                }}
              />
            </div>
          )}
        </div>
        {status.value && (
          <Button
            size='large'
            variant='contained'
            onClick={downloadReport}
            disabled={(reportData.results || []).length === 0}
          >
            Download reports
          </Button>
        )}
      </div>
      <SiTable
        header={getHeaderConfig()}
        data={reportData.results || []}
        pageCount={reportData.totalPages}
        onChange={(e, page) => {
          setFilters({
            ...filters,
            page
          });
        }}
      ></SiTable>
      {!status.value && (
        <span className='user-info-msg'>
          Please select the OEM wise to download reports
        </span>
      )}
    </div>
  );
};

export default OEMReports;
