/** @format */

import React, { useState } from 'react';
import CustomModal from '../../core/modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from 'react-select';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { toast } from 'react-toastify';
import { STATES, INDUSTRY } from './helper';
import { IconButton } from '@mui/material';
const OemActionIcons = ({ id, Code, Address, LoadData, Name, Industry }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [name, setName] = useState(Name);
  const [code, setCode] = useState(Code);
  const [address, setAddress] = useState(Address.line1);
  const [country, setCountry] = useState(Address.country);
  const [district, setDistrict] = useState(Address.district);
  const [state, setState] = useState(Address.state);
  const [industry, setIndustry] = useState(Industry);
  const editHandler = () => {
    setEdit(true);
  };
  const deleteHandler = () => {
    setDel(true);
  };

  const addNameHandler = (event) => {
    setName(event.target.value);
  };
  const addCodeHandler = (event) => {
    setCode(event.target.value);
  };
  const addAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const addStateHandler = (event) => {
    setState(event.label);
  };
  const addIndustryHandler = (event) => {
    setIndustry(event.label);
  };
  const addDistrictHandler = (event) => {
    setDistrict(event.target.value);
  };
  const addCountryHandler = (event) => {
    setCountry(event.target.value);
  };
  const payload = {
    name: name,
    code: code,
    address: {
      line1: address,
      district: district,
      state: state,
      country: country,
    },
    industry: industry,
  };
  //Edit Oem
  const editOemHandler = () => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.OEMS}/fetch/${id}`,
      payload
    ).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        LoadData();
        setEdit(false);
      }
    });
  };
  //Delete Oem
  const deleteOemHandler = () => {
    payload.active = false;
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.OEMS}/fetch/${id}`,
      payload
    ).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        LoadData();
        setDel(false);
      }
    });
  };
  let closeEditModal = () => {
    setEdit(false);
  };
  let CloseDeleteModal = () => {
    setDel(false);
  };
  return (
    <div>
      <Stack direction='row' spacing={2}>
        <IconButton sx={{ p: 0, pl: 1 }} onClick={editHandler}>
          <EditIcon id='edit' />
        </IconButton>

        <IconButton onClick={deleteHandler} id='delete' sx={{ p: 0 }}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      {edit && (
        <CustomModal
          title='Edit Oem '
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={closeEditModal}
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
              sx={{ mb: 1 }}
              rows={4}
              onChange={addNameHandler}
              value={name}
              disabled={true}
              size='small'
            />
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
              label='Country'
              sx={{ mb: 1 }}
              rows={4}
              onChange={addCountryHandler}
              value={country}
              size='small'
              fullWidth
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
                onClick={editOemHandler}
              >
                Save
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => {
                  closeEditModal(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
      {del && (
        <CustomModal
          title='Confirm Delete'
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={CloseDeleteModal}
        >
          <h3>Are you sure to delete this item?</h3>
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' onClick={() => setDel(false)}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={deleteOemHandler}
            >
              Delete
            </Button>
          </Stack>
        </CustomModal>
      )}
    </div>
  );
};
export default OemActionIcons;
