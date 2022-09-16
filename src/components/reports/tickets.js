/** @format */

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, TextField } from '@mui/material';
import { getHeaderConfig, TICKET_REPORT_STATUS } from './helper';
import SiTable from '../../core/table';
import { HTTP_METHODS, invokeApi } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import './index.scss';
import { exportToExcel } from '../../utils';

const TicketReports = () => {
  const [reportData, setReportData] = useState({});
  const [status, setStatus] = useState({});
  const [otherStatus, setOtherStatus] = useState({});
  const [hrmRange, setHrmRange] = useState({
    start: '',
    end: '',
  });
  const [otherDropDownOptions, setOtherDropDownOptions] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const loadData = (payload) => {
    invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.TICKETS_REPORTS}`,
      payload
    )
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
    if (status.nextDropDownLabel) {
      if (otherStatus.value) {
        Object.keys(status.filterPayload.others).forEach((key) => {
          payload[key] = otherStatus.value;
        });
      }
    }

    let response = await invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.TICKETS_REPORTS}`,
      payload
    );
    exportToExcel(response.results || [], status.label);
  };

  const otherOptions = () => {
    if (
      status.value !== 'CUSTOMER_COMPLAINT_WISE' &&
      status.value !== 'PART_CAUSING_FAILURE_WISE'
    ) {
      return;
    }
    let type = 'part';
    if (status.value === 'CUSTOMER_COMPLAINT_WISE') {
      type = 'complaint';
    }
    let url = REST_URLS.CODES + type;
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${url}`, null)
      .then((response) => {
        if (type === 'part' && response) {
          setOtherDropDownOptions(
            response.map((r) => {
              return {
                ...r,
                label: r.code || r.description,
                value: r.code || r.description,
              };
            })
          );
        }
        if (response.results) {
          setOtherDropDownOptions(
            response.results.map((r) => {
              return {
                ...r,
                label: r.code || r.description,
                value: r.code || r.description,
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
    if (status.filterPayload) {
      if (status.nextDropDownLabel) {
        if (otherStatus.value) {
          let payload = {
            ...status.filterPayload,
            ...filters,
          };
          Object.keys(payload.others).forEach((key) => {
            payload.others[key] = otherStatus.value;
          });
          loadData(payload);
        } else {
          otherOptions();
        }
      } else {
        loadData({
          ...status.filterPayload,
          ...filters,
        });
      }
    }
  }, [status, filters, otherStatus]);

  const getNextStatusInput = () => {
    switch (status.value) {
      case 'LIST_NUMBER_WISE':
      case 'MODEL_WISE':
        return (
          <div className='hrm-range'>
            <div>
              <div>{status.nextDropDownLabel}</div>
              <TextField
                size='small'
                value={hrmRange.start}
                onChange={(event) =>
                  setHrmRange({
                    ...hrmRange,
                    start: event.target.value,
                  })
                }
              />
            </div>

            <Button
              size='large'
              variant='contained'
              onClick={() => {
                setOtherStatus({
                  value: +hrmRange.start,
                });
              }}
              disabled={!hrmRange.start}
            >
              Load Data
            </Button>
          </div>
        );
      case 'HMR_WISE':
        return (
          <div className='hrm-range'>
            <div>
              <div>{status.nextDropDownLabel} From</div>
              <TextField
                size='small'
                value={hrmRange.start}
                onChange={(event) =>
                  setHrmRange({
                    ...hrmRange,
                    start: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <div>{status.nextDropDownLabel} To</div>
              <TextField
                size='small'
                value={hrmRange.end}
                onChange={(event) =>
                  setHrmRange({
                    ...hrmRange,
                    end: event.target.value,
                  })
                }
              />
            </div>

            <Button
              size='large'
              variant='contained'
              onClick={() => {
                setOtherStatus({
                  value: {
                    start: +hrmRange.start,
                    end: +hrmRange.end,
                  },
                });
              }}
              disabled={!hrmRange.end || !hrmRange.start}
            >
              Load Data
            </Button>
          </div>
        );

      default:
        return (
          <div>
            <div>{status.nextDropDownLabel}</div>
            <Select
              value={otherStatus}
              classNamePrefix='si-select'
              options={otherDropDownOptions}
              onChange={(option) => setOtherStatus(option)}
            />
          </div>
        );
    }
  };
  return (
    <div className='reports-table'>
      <div className='filter-section'>
        <div className='left-s'>
          <div>
            <div>Status</div>
            <Select
              value={status}
              classNamePrefix='si-select'
              options={TICKET_REPORT_STATUS}
              onChange={(option) => {
                setReportData([]);
                setStatus(option);
                setOtherStatus({});
              }}
            />
          </div>
          {status.nextDropDownLabel && getNextStatusInput()}
        </div>

        {((status.value && !status.nextDropDownLabel) ||
          (status.value && status.nextDropDownLabel && otherStatus.value)) && (
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
          Please select the status to download reports
        </span>
      )}
    </div>
  );
};

export default TicketReports;
