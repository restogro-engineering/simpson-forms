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
const Parts = () => {
  const [addParts, setAddParts] = useState(false);
  const [description, setDescription] = useState('');
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getOfflineData('user')) {
      navigate('/login');
    } else {
      loadData();
    }
  }, []);
  const addPartFormHandler = () => {
    setAddParts(true);
  };
  const addDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const payload = {
    type: 'part',
    description: description,
  };
  //Show All Parts
  const loadData = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.CODES}part`, null).then(
      (response) => {
        if (response) {
          setParts(response);
        }
      }
    );
  };
  //Add New Part
  const formSubmitHandler = () => {
    if (payload.code !== '' && payload.description !== '') {
      invokeApi(
        HTTP_METHODS.POST,
        `${HOSTNAME}${REST_URLS.CODES}part`,
        payload,
        { active: true }
      ).then((response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData();
          setDescription('');
          setAddParts(false);
        }
      });
    }
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
            Add Part
          </Button>
        </div>
        <SiTable
          header={getHeaderConfig(loadData)}
          data={parts || []}
        ></SiTable>
      </div>
      {addParts && (
        <CustomModal
          title='New Part '
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={() => setAddParts(false)}
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
              label='Description'
              multiline
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
                onClick={formSubmitHandler}
              >
                Add
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => {
                  setAddParts(false);
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

export default Parts;
