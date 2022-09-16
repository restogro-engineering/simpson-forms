/** @format */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { HOSTNAME, REST_URLS } from '../../../utils/endpoints';
import { TextField } from '@mui/material';
import {
  HTTP_METHODS,
  invokeApi,  
} from '../../../utils/http-service';
import { toast } from 'react-toastify';
import Select from 'react-select';
import './index.scss';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
};

const GmModal = ({ title, callBack, formConfig = [], loadOtherFileName }) => {
  const [open, setOpen] = useState(false);
  const [inpuFormData, setInpuFormData] = useState({});
  const handleOpen = () => {
    setOpen(true);
    loadOtherFileName();
  };
  const handleClose = () => setOpen(false);

  const fileUpload = () => {
    let payload = {
      ...inpuFormData,
      save: true,
      fileName: 'gm_' + inpuFormData.fileName,
    };
    invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.CALC_GM}`,
      payload
    ).then((response) => {
      if (response.newDashboard) {
        setOpen(false);
        setInpuFormData({});
        callBack && callBack(response.data);
      } else {
        toast.error('File name already exists');
      }
    });
  };

  const checkFileName = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.CHECK_FILE_NAME}`,
      null,
      {
        name: inpuFormData.fileName,
        type: 'gm',
      }
    ).then((response) => {
      if (!response.nameExists) {
        fileUpload();
      } else {
        toast.error('File name already exists');
      }
    });
  };

  const isDisabled = () => {
    let flag = false;
    formConfig.forEach((element) => {
      if (!flag) {
        flag = !inpuFormData[element.name];
      }
    });

    return flag;
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='upload-file-form'>
            <div className='header'>Upload file</div>
            <div className='file-form-body'>
              {formConfig.map((element) => {
                if (element.type === 'text') {
                  return (
                    <TextField
                      fullWidth
                      size='small'
                      value={inpuFormData[element.name]}
                      name={element.name}
                      label={element.label}
                      onChange={(event) => {
                        setInpuFormData({
                          ...inpuFormData,
                          [element.name]: event.target.value,
                        });
                      }}
                    />
                  );
                }

                return (
                  <Select
                    options={element.options}
                    isSearchable
                    placeholder={element.label}
                    className='upload-file-names'
                    value={
                      inpuFormData[element.name]
                        ? {
                            label: inpuFormData[element.name],
                            value: inpuFormData[element.name],
                          }
                        : ''
                    }
                    onChange={(newFileName) => {
                      setInpuFormData({
                        ...inpuFormData,
                        [element.name]: newFileName.value,
                      });
                    }}
                  />
                );
              })}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <Button
                  variant='contained'
                  onClick={checkFileName}
                  disabled={isDisabled()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default GmModal;
