import { Button, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import CustomModal from '../../core/modal';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SubwayFileUpload from '../../core/file-uploader';

const RequestApprovalModal = ({ onClose, onSave }) => {
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');
  const [file, setFile] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <CustomModal onClose={onClose} title='Approval Request'>
      <div className='request-approval-modal'>
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>
            Do you want to Approve / Reject
          </FormLabel>

          <RadioGroup row value={status} onChange={handleChange}>
            <FormControlLabel
              value='Approved'
              control={<Radio />}
              label='Approved'
            />
            <FormControlLabel
              value='Reject'
              control={<Radio />}
              label='Reject'
            />
          </RadioGroup>
        </FormControl>
        <div>
          <TextareaAutosize
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            minLength={100}
            minRows={5}
            fullWidth
          />
        </div>

        <SubwayFileUpload
          title='Upload signature'
          onFileUpload={(file) => setFile(file)}
        />

        <div className='buttons-f'>
          <Button
            variant='contained'
            onClick={() => {
              onSave(status, comments, file);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default RequestApprovalModal;
