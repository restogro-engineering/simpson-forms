/** @format */

import React, { useState, useEffect } from 'react';
import './index.scss';
import SiTable from '../../core/table';
import { getHeaderConfig } from './config';
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
const OemNames = () => {
  const [addParts, setAddParts] = useState('');
  const [description, setDescription] = useState('');
  const [nameId, setNameId] = useState('');
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getOfflineData('user')) {
      navigate('/login');
    } else {
      loadData();
    }
  }, []);

  const loadData = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.OEM_NAMES}`, null).then(
      (response) => {
        if (response) {
          setParts(response);
        }
      }
    );
  };

  const addPartFormHandler = () => {
    setAddParts('ADD');
  };
  const addDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  //Add New Part
  const formSubmitHandler = () => {
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.OEM_NAMES}`, {
      name: description,
    }).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData();
        setDescription('');
        setAddParts(false);
      }
    });
  };

  const onEditSubmitHandler = () => {
    invokeApi(HTTP_METHODS.PUT, `${HOSTNAME}${REST_URLS.OEM_NAMES}/${nameId}`, {
      name: description,
    }).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData();
        setDescription('');
        setAddParts(false);
      }
    });
  };

  const onEdit = (data) => {
    setAddParts('EDIT');
    setDescription(data.name);
    setNameId(data.id);
  };
  return (
    <>
      <div className='part-container'>
        <div className='button-div'>
          <Button
            variant='contained'
            className='button'
            onClick={addPartFormHandler}
          >
            Add OEM
          </Button>
        </div>
        <SiTable
          header={getHeaderConfig(loadData, onEdit)}
          data={parts || []}
        ></SiTable>
      </div>
      {addParts && (
        <CustomModal
          title={addParts === 'ADD' ? 'New OEM name ' : 'Edit OEM name'}
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={() => setAddParts('')}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
            <TextField
              fullWidth
              id='description'
              label='Name'
              size='small'
              sx={{ m: 1 }}
              rows={4}
              onChange={addDescriptionHandler}
              value={description}
            />
            <Stack direction='row' spacing={2} sx={{ m: 1 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                disabled={!description}
                onClick={
                  addParts === 'ADD' ? formSubmitHandler : onEditSubmitHandler
                }
              >
                Save
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => {
                  setAddParts('');
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

export default OemNames;
