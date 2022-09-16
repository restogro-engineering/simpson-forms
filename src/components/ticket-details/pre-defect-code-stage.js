import React, { useState } from "react";
import Select from "react-select";
import { TICKET_STAGES, TICKET_SEVERITY } from "../../utils/constants";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { TextField, Button } from "@mui/material";
import CustomModal from "../../core/modal";

const PreDefectCodeStage = ({ ticketDetails, loadData, id }) => {
  const [payload, setPayload] = useState({});

  const updateEngineModal = () => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.TICKETS}/${id}`,
      payload
    ).then(response => {
      loadData();
    });
  };

  if (
    (!ticketDetails.engineModal ||
      !ticketDetails.dateOfInspection ||
      !ticketDetails.severity) &&
    ticketDetails.stage === TICKET_STAGES.UPDATE_DEFECT_CODE
  ) {
    return (
      <CustomModal title='Update details'>
        <div className="pre-defect-code-stage">
          {!ticketDetails.engineModal && (
            <TextField
              value={payload.engineModal}
              onChange={e =>
                setPayload({
                  engineModal: e.target.value
                })
              }
              placeholder='Engine model'
              fullWidth
              size='small'
            />
          )}         

          {ticketDetails.engineModal && !ticketDetails.dateOfInspection && (
            <>
              <div>Date of inspection</div>
              <TextField
                value={payload.dateOfInspection}
                type='date'
                onChange={e =>
                  setPayload({
                    dateOfInspection: e.target.value
                  })
                }
                placeholder='Date of inspection'
                fullWidth
                size='small'
              />
            </>
          )}         

          {ticketDetails.dateOfInspection && !ticketDetails.severity && (
            <div className='severity'>
              <div>Ticket Severity</div>
              <Select
                value={TICKET_SEVERITY.find(
                  t => t.value === ticketDetails.severity
                )}
                classNamePrefix='si-select'
                options={TICKET_SEVERITY}
                onChange={value => {
                  setPayload({
                    severity: value.value
                  });
                }}
              />
            </div>
          )}         
          <Button
            fullWidth
            variant='contained'
            color='primary'
            size='small'
            onClick={updateEngineModal}
            disabled={
              !(!payload.engineModal ||
              !payload.dateOfInspection ||
              !payload.severity)
            }
          >
            Update
          </Button>
        </div>
      </CustomModal>
    );
  }
  return null;
};

export default PreDefectCodeStage;
