/** @format */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SubwayFileUpload from '../file-uploader';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { TextField } from '@mui/material';
import {
  HTTP_METHODS,
  invokeApi,
  invokeUploadFile,
} from '../../utils/http-service';
import { toast } from 'react-toastify';
import Select from 'react-select';
import './index.scss';

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
};

const FILE_NAME_PREFIX = {
  item: 'rm_',
  premix: 'premix_',
  recipe: 'dom_',
  dashboard: 'sales_',  
};

const FileUploadModal = ({ title, callBack, url, formConfig, type }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [inpuFormData, setInpuFormData] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fileUpload = () => {
    const formData = new FormData();
    formData.append('upload', file);
    formConfig.forEach((element) => {
      if (element.name === 'fileName') {
        formData.append(
          element.name,
          FILE_NAME_PREFIX[type] + inpuFormData[element.name]
        );
      } else {
        formData.append(element.name, inpuFormData[element.name]);
      }
    });
    return invokeUploadFile(`${HOSTNAME}${url}`, formData)
      .then((response) => {
        if (response.status === 200) {
          setFile(null);
          setOpen(false);
          setInpuFormData({});
          callBack && callBack(response.data);
        } else {
          toast.error(
            (response.data && response.data.message) || 'Upload Failed'
          );
        }
      })
      .catch((err) => {
        toast.error('Upload failed err');
      });
  };

  const checkFileName = () => {    
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.CHECK_FILE_NAME}`,
      null,
      {
        name: inpuFormData.fileName,
        type,
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
    let flag = !file;
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

              <SubwayFileUpload
                title={title}
                callBack={callBack}
                onFileUpload={setFile}
              />
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

export default FileUploadModal;
