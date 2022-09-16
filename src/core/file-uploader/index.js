/** @format */

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './index.scss';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BackupIcon from '@mui/icons-material/Backup';
import { invokeUploadFile } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';

const SubwayFileUpload = ({ title, url, clsName, callBack, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    fileUpload();
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    if (onFileUpload) {
      onFileUpload(e.target.files[0]);
    }
  };

  const fileUpload = () => {
    const formData = new FormData();
    formData.append('upload', file);
    return invokeUploadFile(`${HOSTNAME}${url}`, formData)
      .then((response) => {
        if (response.status === 200) {
          setFile(null);
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

  return (
    <form className={`subway-upload-file ${clsName}`}>
      {file === null ? (
        <>
          <label
            htmlFor='file-upload'
            className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary upload-button'
          >
            <span className='fr-hide-mobile'>{`${title}`}</span>
            <BackupIcon />
          </label>
        </>
      ) : (
        <label title={(file && file.name) || ''} className='uploaded-file-name'>
          {(file && file.name) || ''}
        </label>
      )}
      <input
        id='file-upload'
        type='file'
        onChange={(event) => {
          onChange(event);
          event.target.value = null;
        }}
      />
      {file !== null && (
        <span>
          {!onFileUpload && (
            <IconButton color='primary' onClick={onFormSubmit} title='Upload'>
              <CheckCircleOutlineIcon />
            </IconButton>
          )}
          <IconButton
            color='primary'
            onClick={() => setFile(null)}
            title='Clear'
          >
            <ClearIcon />
          </IconButton>
        </span>
      )}
      <div>{file && <img src={URL.createObjectURL(file)} width='160'  height="auto"/>}</div>
    </form>
  );
};

export default SubwayFileUpload;
