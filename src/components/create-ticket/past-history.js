import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CustomModal from "../../core/modal";

const style = {
  display: "flex",
  gridGap: 10,
  flexDirection: "column"
};

const PastHistory = ({ handleClose, onSave }) => {
  const [serviceDetails, setServiceDetails] = useState({});

  const onInputChange = event => {
    setServiceDetails({
      ...serviceDetails,
      [event.target.name]: event.target.value
    });
  };

  return (
    <CustomModal onClose={handleClose} title='Add Past History'>
      <div style={style}>
        <TextField
          size='small'
          fullWidth
          value={serviceDetails.dateOfFailure}
          name='dateOfFailure'
          type='date'
          placeholder='Date Of Failure'
          onChange={onInputChange}
        />
        <TextField
          size='small'
          fullWidth
          label='Running Hours'
          value={serviceDetails.hours}
          name='hours'
          type='number'
          onChange={onInputChange}
        />
        <TextField
          size='small'
          label='Complaint Reported'
          fullWidth
          value={serviceDetails.complaintReported}
          name='complaintReported'
          onChange={onInputChange}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          disabled={
            !serviceDetails.dateOfFailure ||
            !serviceDetails.hours ||
            !serviceDetails.complaintReported
          }
          onClick={() => onSave(serviceDetails)}
        >
          Save
        </Button>
      </div>
    </CustomModal>
  );
};
export default PastHistory;
