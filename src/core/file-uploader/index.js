/** @format */

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PublishIcon from '@mui/icons-material/Publish';
import './index.scss';
import { IconButton } from '@mui/material';
import { invokeUploadFile } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';

const SiFileUpload = ({ title, clsName, url, callBack, id }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    fileUpload();
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fileUpload = () => {
    const formData = new FormData();
    formData.append('upload', file);
    setUploadStatus('Uploading...');
    return invokeUploadFile(
      `${HOSTNAME}${REST_URLS.UPLOAD_FILES}${id}`,
      formData
    )
      .then((response) => {
        if (response.status === 200) {
          toast.info('Uploaded Successfully');
          setFile(null);
          callBack && callBack();
          setUploadStatus('');
        } else {
          toast.error(
            (response.data && response.data.message) || 'Upload Failed'
          );
          setUploadStatus('');
        }
      })
      .catch((err) => {
        setUploadStatus('Upload Failed');
        toast.error('Upload Failed');
      });
  };

  return (
    <form className={`spidle-upload-file ${clsName}`}>
      {file === null ? (
        <IconButton
          title='Attach file'
          size='small'
          style={{
            background: '#000',
            color: '#fff',
            borderRadius: 0,
            cursor: 'pointer',
          }}
        >
          <label
            htmlFor='file-upload'
            className='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary upload-button'
          >
            Upload Documents <PublishIcon fontSize='small' />
          </label>
        </IconButton>
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
          <IconButton
            color='primary'
            onClick={onFormSubmit}
            title='Upload'
            disabled={uploadStatus}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton
            color='primary'
            onClick={() => setFile(null)}
            title='Clear'
            disabled={uploadStatus}
          >
            <HighlightOffIcon />
          </IconButton>
        </span>
      )}
      {uploadStatus}
    </form>
  );
};

export default SiFileUpload;
