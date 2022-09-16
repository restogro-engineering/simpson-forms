/** @format */

import React, { useState, useEffect } from 'react';
import './index.scss';
import SiTable from '../../core/table';
import { useNavigate } from 'react-router-dom';
import { getOfflineData } from '../../utils/offline-services';
import { getHeaderConfig, getMobileHeaderConfig } from './config';
import Button from '@mui/material/Button';
import CustomModal from '../../core/modal';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
const ServiceEngineers = () => {
  const [serviceEng, setServiceEng] = useState({});
  const [addServiceEng, setAddServiceEng] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    role: 'SERVICE_ENGINEER',
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!getOfflineData('user')) {
      navigate('/login');
    } else {
      loadData(filters);
    }
  }, []);
  const addServiceEngFormHandler = () => {
    setAddServiceEng(true);
  };

  const addNameHandler = (event) => {
    setName(event.target.value);
  };
  const addEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const addPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const payload = {
    role: 'SERVICE_ENGINEER',
    name: name,
    email: email,
    password: password,
  };

  //Add New Service Engineer
  const formSubmitHandler = () => {
    if (
      payload.name !== '' &&
      payload.email !== '' &&
      payload.password !== ''
    ) {
      invokeApi(
        HTTP_METHODS.POST,
        `${HOSTNAME}${REST_URLS.ADD_SERVICE_ENGINEER}`,
        payload
      ).then((response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData(filters);
          setName('');
          setEmail('');
          setPassword('');
          setAddServiceEng(false);
        }
      });
    }
  };
  const loadData = (params) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.SERVICE_ENGINEER}`,
      null,
      params
    )
      .then((response) => {
        if (response) {
          setServiceEng(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className='serviceEng-container'>
        <div className='button-div'>
          <Button
            variant='contained'
            className='button'
            onClick={addServiceEngFormHandler}
          >
            Add Service Engineer
          </Button>
        </div>
        <div className='si-hide-mobile'>
          <SiTable
            header={getHeaderConfig(loadData)}
            data={serviceEng.results || []}
            pageCount={serviceEng.totalPages}
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
        </div>
        <div className='si-hide-web'>
          <SiTable
            header={getMobileHeaderConfig()}
            data={serviceEng.results || []}
            pageCount={serviceEng.totalPages}
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
        </div>
      </div>
      {addServiceEng && (
        <CustomModal
          title='New Service Engineer'
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={() => setAddServiceEng(false)}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
            <TextField
              fullWidth
              id='name'
              label='Name'
              multiline
              sx={{ m: 1 }}
              onChange={addNameHandler}
              value={name}
              size='small'
            />
            <TextField
              fullWidth
              id='email'
              label='Email'
              sx={{ m: 1 }}
              onChange={addEmailHandler}
              value={email}
              type='email'
              size='small'
            />
            <TextField
              fullWidth
              id='password'
              label='Password'
              sx={{ m: 1 }}
              onChange={addPasswordHandler}
              value={password}
              type='password'
              size='small'
            />
            <Stack direction='row' spacing={2} sx={{ m: 1 }}>
              <Button
                variant='contained'
                color='primary'
                onClick={formSubmitHandler}
                fullWidth
              >
                Add
              </Button>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => {
                  setAddServiceEng(false);
                }}
                fullWidth
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
    </>
  );
};

export default ServiceEngineers;
