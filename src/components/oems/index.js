/** @format */

import React, { useState, useEffect } from 'react';
import './index.scss';
import SiTable from '../../core/table';
import { getHeaderConfig, getMobileHeaderConfig } from './config';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { useNavigate } from 'react-router-dom';
import { getOfflineData } from '../../utils/offline-services';
import { toast } from 'react-toastify';
import CustomModal from '../../core/modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from 'react-select';

import { STATES, INDUSTRY } from './helper';
const Oems = () => {
  const [addOem, setAddOem] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [industry, setIndustry] = useState('');
  const [Oems, setOems] = useState({});
  const [oemNames, setOemNames] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!getOfflineData('user')) {
      navigate('/login');
    } else {
      loadData(filters);
      loadNames();
    }
  }, []);
  const addOemFormHandler = () => {
    setAddOem(true);
  };
  const addNameHandler = (event) => {
    setName(event);
  };
  const addCodeHandler = (event) => {
    setCode(event.target.value);
  };
  const addEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const addPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const addAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const addStateHandler = (event) => {
    setState(event.label);
  };
  const addDistrictHandler = (event) => {
    setDistrict(event.target.value);
  };
  const addCountryHandler = (event) => {
    setCountry(event.target.value);
  };
  const addIndustryHandler = (event) => {
    setIndustry(event.label);
  };
  const payload = {
    name: name.name,
    code: code,
    email: email,
    oemNameId: name.id,
    password: password,
    address: {
      line1: address,
      district: district,
      state: state,
      country: country,
    },
    industry: industry,
  };
  //Show All Oems
  const loadData = (params) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.OEMS}`,
      null,
      params
    ).then((response) => {
      if (response) {
        setOems(response);
      }
    });
  };

  const loadNames = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.OEM_NAMES}`, null).then(
      (response) => {
        if (response) {
          setOemNames(response);
        }
      }
    );
  };
  //Add New Oem
  const formSubmitHandler = () => {
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.OEMS}`, payload, {
      active: true,
    }).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData();
        setName('');
        setCode('');
        setEmail('');
        setPassword('');
        setAddress('');
        setDistrict('');
        setState('');
        setCountry('');
        setIndustry('');
        setAddOem(false);
      }
    });
  };
  return (
    <>
      <div className='oem-container'>
        <div className='button-div'>
          <Button
            variant='contained'
            className='button'
            onClick={addOemFormHandler}
          >
            Add Oem
          </Button>
        </div>
        <div className='si-hide-mobile'>
          <SiTable
            header={getHeaderConfig(loadData)}
            data={Oems.results || []}
            pageCount={Oems.totalPages}
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
            header={getMobileHeaderConfig(loadData)}
            data={Oems.results || []}
            pageCount={Oems.totalPages}
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
      {addOem && (
        <CustomModal
          title='New Oem'
          contentClassName='add-oem'
          onClose={() => setAddOem(false)}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
            <div className='oem-drop-downs-c'>
              <Select
                value={name}
                classNamePrefix='si-select'
                options={oemNames}
                onChange={addNameHandler}
                getOptionLabel={(op) => op.name}
                getOptionValue={(op) => op.id}
                placeholder={state !== '' ? state : 'Name'}
              />
              <div></div>
            </div>
            <TextField
              fullWidth
              id='code'
              label='Code'
              sx={{ mb: 1 }}
              rows={4}
              onChange={addCodeHandler}
              value={code}
              size='small'
            />

            <TextField
              fullWidth
              id='email'
              label='Email'
              sx={{ mb: 1 }}
              onChange={addEmailHandler}
              value={email}
              type='email'
              size='small'
            />
            <TextField
              fullWidth
              id='password'
              label='Password'
              sx={{ mb: 1 }}
              onChange={addPasswordHandler}
              value={password}
              type='password'
              size='small'
            />
            <TextField
              fullWidth
              id='address'
              label='Address'
              sx={{ mb: 1 }}
              rows={4}
              onChange={addAddressHandler}
              value={address}
              size='small'
            />
            <TextField
              fullWidth
              id='district'
              label='District'
              sx={{ mb: 1 }}
              rows={4}
              onChange={addDistrictHandler}
              value={district}
              size='small'
            />

            <TextField
              id='country'
              fullWidth
              label='Country'
              sx={{ mb: 1 }}
              rows={4}
              onChange={addCountryHandler}
              value={country}
              size='small'
            />
            <div className='oem-drop-downs-c'>
              <Select
                value={industry}
                classNamePrefix='si-select'
                options={INDUSTRY}
                onChange={addIndustryHandler}
                placeholder={industry !== '' ? industry : 'Domain'}
              />

              <Select
                value={state}
                classNamePrefix='si-select'
                options={STATES}
                onChange={addStateHandler}
                placeholder={state !== '' ? state : 'State'}
              />
            </div>

            <Stack direction='row' spacing={2} sx={{ m: 1, ml: 0 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={formSubmitHandler}
              >
                Add
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => {
                  setAddOem(false);
                }}
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

export default Oems;
