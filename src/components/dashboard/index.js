/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import SiTable from '../../core/table';
import { formatData, getDashboardUploadCOnfig, HeaderConfig } from './config';
import { getOfflineData, setOfflineData } from '../../utils/offline-services';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { Button } from '@mui/material';
import Select from 'react-select';
import { exportToExcel } from '../../utils';
import { APPROVAL_LIST } from '../../utils/mock';
import CustomModal from '../../core/modal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [pastTickets, setPastTickets] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [rmFileNames, setRMFileNames] = useState([]);
  const [premixFileNames, setPremixFileNames] = useState([]);
  const [bomFileNames, setDomFileNames] = useState([]);
  const [salesFileNames, setSalesFileNames] = useState([]);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    let tickets = getOfflineData('tickets');
    if (tickets) {
      setPastTickets(tickets);
    } else {
      setOfflineData('tickets', APPROVAL_LIST);
      setPastTickets(APPROVAL_LIST);
    }
  }, []);

  const loadData = (filtersObj) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_GM}`,
      null,
      filtersObj
    ).then((response) => {
      if (response.results) {
        setPastTickets(response);
      }
    });
  };

  const loadFileName = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_FILE_NAMES}`,
      null,
      {
        type: 'gm',
      }
    ).then((response) => {
      if (response && response.length > 0) {
        loadData({
          ...filters,
          fileName: response[0],
        });

        setFilters({
          ...filters,
          fileName: { label: response[0], value: response[0] },
        });
        setFileNames(response.map((op) => ({ label: op, value: op })));
      }
    });
  };

  const loadOtherFileName = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_FILE_NAMES}`,
      null,
      {
        type: 'item',
      }
    ).then((response) => {
      if (response && response.length > 0) {
        setRMFileNames(response.map((op) => ({ label: op, value: op })));
      }
    });

    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_FILE_NAMES}`,
      null,
      {
        type: 'premix',
      }
    ).then((response) => {
      if (response && response.length > 0) {
        setPremixFileNames(response.map((op) => ({ label: op, value: op })));
      }
    });

    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_FILE_NAMES}`,
      null,
      {
        type: 'recipe',
      }
    ).then((response) => {
      if (response && response.length > 0) {
        setDomFileNames(response.map((op) => ({ label: op, value: op })));
      }
    });

    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_FILE_NAMES}`,
      null,
      {
        type: 'dashboard',
      }
    ).then((response) => {
      if (response && response.length > 0) {
        setSalesFileNames(response.map((op) => ({ label: op, value: op })));
      }
    });
  };

  const downloadData = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.GET_GM}`, null, {
      page: 1,
      limit: pastTickets.totalPages,
      fileName: filters.fileName.label,
      isDownload: true,
    }).then((response) => {
      if (response.results) {
        exportToExcel(formatData(response.results), 'price_list');
        // exportToExcel(response.results, "gm_list");
      }
    });
  };

  const onRowClick = (data, type) => {
    const { comments = [] } = data;
    if (type === 'ID') {
      navigate(`/form/edit/${data.id}/${data.formType}`);
    } else {
      setOpenComments(comments);
    }
  };

  return (
    <div className='past-tickets-container'>
      <div className='create-new'>
        <span className='label'>My Work list</span>
        <Button variant='outlined' onClick={() => navigate('/form/create/1/0')}>
          Create new Request
        </Button>
      </div>
      <SiTable
        header={HeaderConfig}
        data={pastTickets || []}
        onClick={onRowClick}
        // pageCount={pastTickets.totalPages}
        onChange={(event, page) => {
          setFilters({
            ...filters,
            page,
          });
          loadData({
            ...filters,
            page,
          });
        }}
      ></SiTable>

      {openComments && (
        <CustomModal title='Comments' onClose={() => setOpenComments(null)}>
          <div className='comment-row'>
            <span>Comment</span>
            <spam>Comment By</spam>
            <spam>Date</spam>
          </div>
          {openComments.map((comment) => {
            return (
              <div className='comment-row'>
                <span>{comment.msg} </span>
                <spam>{comment.by}</spam>
                <spam>{comment.date}</spam>
              </div>
            );
          })}
        </CustomModal>
      )}
    </div>
  );
};

export default Dashboard;
