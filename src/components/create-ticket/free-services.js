import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import Select from "react-select";
import CustomModal from "../../core/modal";

 const SERVICE_LIST = [
  { label: "1st Service", value: "firstService" },
  { label: "2nd Service", value: "secondService" },
  { label: "3rd Service", value: "thirdService" },
  { label: "4th Service", value: "fourthService" }
];

const style = {
  display: "flex",
  gridGap: 10,
  flexDirection: "column"
};

const FreeServices = ({ handleClose, onSave }) => {
  const [serviceDetails, setServiceDetails] = useState({});

  const onInputChange = event => {
    setServiceDetails({
      ...serviceDetails,
      [event.target.name]: event.target.value
    });
  };

  return (
    <CustomModal onClose={handleClose} title='Create Past Service Record'>
      <div style={style}>
        <Select
          placeHolder='Service number'
          options={SERVICE_LIST}
          value={serviceDetails.name}
          onChange={value => {
            onInputChange({
              target: {
                name: "name",
                value: value
              }
            });
          }}
        />
        <TextField
          size='small'
          fullWidth
          value={serviceDetails.date}
          name='date'
          type='date'
          onChange={onInputChange}
        />
        <TextField
          size='small'
          fullWidth
          value={serviceDetails.runningHours}
          name='runningHours'
          placeholder='Running Hours'
          type='number'
          onChange={onInputChange}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          disabled={
            !serviceDetails.runningHours ||
            !serviceDetails.date ||
            !serviceDetails.name
          }
          onClick={() => onSave(serviceDetails)}
        >
          Save
        </Button>
      </div>
    </CustomModal>
  );
};
export default FreeServices;
