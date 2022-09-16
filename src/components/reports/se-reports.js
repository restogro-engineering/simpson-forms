/** @format */

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from '@mui/material';
import { getHeaderConfig } from './helper';
import SiTable from '../../core/table';
import { HTTP_METHODS, invokeApi } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import './index.scss';
import { exportToExcel } from '../../utils';

const SEReports = () => {
  const [reportData, setReportData] = useState({});
  const [status, setStatus] = useState({});
  const [serviceEngineers, setServiceEngineers] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    otherOptions();
  }, []);

  const loadData = (payload) => {
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.SE_REPORTS}`, payload)
      .then((response) => {
        if (response) {
          setReportData(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadReport = async () => {
    let payload = status.filterPayload;
    payload.page = 1;
    payload.limit = reportData.totalResults;
    let response = await invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.SE_REPORTS}`,
      payload
    );
    exportToExcel(response.results || [], status.label);
  };

  const otherOptions = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.SERVICE_ENGINEER}`,
      null,
      {
        role: 'SERVICE_ENGINEER',
        page: 1,
        limit: 1000,
      }
    )
      .then((response) => {
        if (response.results) {
          setServiceEngineers(
            response.results.map((r) => {
              return {
                ...r,
                label: r.name,
                value: r.id,
              };
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (status.id) {
      loadData({
        ...filters,
        serviceEngineer: status.id,
      });
    }
  }, [status, filters]);

  return (
    <div className='reports-table'>
      <div className='filter-section'>
        <div>
          <div>Service engineer list</div>
          <Select
            value={status}
            classNamePrefix='si-select'
            options={serviceEngineers}
            onChange={(option) => {
              setStatus(option);
            }}
          />
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
            page,
          });
        }}
      ></SiTable>
      {!status.value && (
        <span className='user-info-msg'>
          Please select the service engineer to download reports
        </span>
      )}
    </div>
  );
};

export default SEReports;
