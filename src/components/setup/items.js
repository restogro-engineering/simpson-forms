/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import './index.scss';
import SiTable from '../../core/table';
import { getItemUploadCOnfig, ItemsHeaderConfig } from './config';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import { debounce, exportToExcel } from '../../utils';
import FileUploadModal from '../../core/upload-modal';

const Items = () => {
  const [pastTickets, setPastTickets] = useState({});
  const [fileNames, setFileNames] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (searchKey === '') {
      loadFileName();
    }
  }, [searchKey]);

  const loadFileName = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.GET_FILE_NAMES}`,
      null,
      {
        type: 'item',
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

  const loadData = (filtersObj) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.ITEMS}`,
      null,
      filtersObj
    ).then((response) => {
      if (response.results) {
        setPastTickets(response);
      }
    });
  };

  const downloadData = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.ITEMS}`, null, {
      page: 1,
      limit: pastTickets.totalResults,
      fileName: filters.fileName.label,
      isDownload: true,
    }).then((response) => {
      if (response.results) {
        exportToExcel(response.results, 'items', 'items');
      }
    });
  };

  const onSearch = (key) => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.SEARCH}`, null, {
      page: 1,
      limit: 10,
      type: 'item',
      name: key,
    }).then((response) => {
      if (response.results) {
        setPastTickets(response);
      }
    });
  };

  const autoSuggestions = useCallback(debounce(onSearch, 500), []);

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      autoSuggestions(searchKey);
    }
  };

  useEffect(() => {
    if (searchKey && searchKey.length > 3) {
      autoSuggestions(searchKey);
    }
  }, [searchKey]);

  return (
    <div className='table-container items-container'>
      <div className='title-bar'>
        <div className='l-c'>
          <Select
            options={fileNames}
            isSearchable
            value={filters.fileName}
            onChange={(newFileName) => {
              setFilters({
                ...filters,
                fileName: newFileName,
              });
              loadData({
                ...filters,
                fileName: newFileName.value,
              });
            }}
          />
          <TextField
            InputProps={{
              startAdornment: <SearchIcon onClick={onSearch} />,
            }}
            placeholder='Search'
            size='small'
            variant='outlined'
            value={searchKey}
            onChange={(event) => setSearchKey(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button variant='outlined' onClick={downloadData}>
            Download Data
          </Button>
        </div>

        <div className='r-c'>
          <FileUploadModal
            title='Upload items'
            url={REST_URLS.UPLOAD_ITEM}
            formConfig={getItemUploadCOnfig()}
            callBack={() => loadFileName()}
            type='item'
          />
        </div>
      </div>
      <SiTable
        header={ItemsHeaderConfig}
        data={pastTickets.results || []}
        pageCount={searchKey.length === 0 ? pastTickets.totalPages : 0}
        onChange={(event, page) => {
          setFilters({
            ...filters,
            page,
          });
          loadData({
            fileName: filters?.fileName?.value,
            limit: 10,
            page,
          });
        }}
      ></SiTable>
    </div>
  );
};

export default Items;
