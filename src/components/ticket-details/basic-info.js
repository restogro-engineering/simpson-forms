import React, { useState, useEffect } from "react";
import Select from "react-select";
import EditIcon from "@mui/icons-material/Edit";
import "./index.scss";
import { useParams } from "react-router";
import { formatDate, convertToCamelCaseFromUnderScore } from "../../utils";
import { DATE_FORMATS } from "../../utils/constants";
import { IconButton, Button } from "@mui/material";
import CustomModal from "../../core/modal";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
const BasicInfo = ({ ticketDetails, serviceEngineers = [], loadData }) => {
  const { id = "" } = useParams();
  const [engineer, setEngineer] = useState({});
  const [reassign, setReassign] = useState(false);

  useEffect(() => {
    serviceEngineers &&
      setEngineer(
        serviceEngineers.find(s => s.id === ticketDetails.serviceEngineerId)
      );
  }, [serviceEngineers]);

  const assignEngineer = () => {
    if (engineer.id === ticketDetails.serviceEngineerId) {
      setReassign(false);
      setEngineer({});
      return;
    }

    invokeApi(HTTP_METHODS.PUT, `${HOSTNAME}${REST_URLS.ASSIGN_SE}/${id}`, {
      serviceEngineerId: engineer.id
    }).then(response => {
      setEngineer({});
      setReassign(false);
      loadData();
    });
  };

  return (
    <div className='basic-info-container'>
      <div className='inputs'>
        <div className='info-section'>
          <div className='label'>Ticket id: {id.substr(0, 8)}</div>
        </div>

        <div className='info-section'>
          <span>Ticket Stage:</span>
          <div className='value'>
            {convertToCamelCaseFromUnderScore(ticketDetails.stage || "")}
          </div>
        </div>
        <div className='info-section'>
          <span>Created At:</span>
          <div className='value'>
            {formatDate(ticketDetails.createdAt, DATE_FORMATS["YYYY-MM-DD"])}
          </div>
        </div>
        <div className='info-section'>
          <div>Ticket Status:</div>
          <div className='value'>{ticketDetails.status}</div>
        </div>
        <div className='info-section'>
          <div>Engine no:</div>
          <div className='value'>{ticketDetails.engineNo}</div>
        </div>
        {ticketDetails.serviceEngineer && (
          <div className='info-section'>
            <div>Service engineer:</div>
            <div className='value service-engineer'>
              {ticketDetails.serviceEngineer}
              <IconButton
                size='small'
                fontSize='12'
                onClick={() => setReassign(true)}
              >
                <EditIcon fontSize='12' />
              </IconButton>
            </div>
            {/*  */}
          </div>
        )}
        {reassign && (
          <CustomModal
            title='Reassign engineer'
            onClose={() => setReassign(false)}
          >
            <div className='reassign-container'>
              <div>Service engineer</div>
              <Select
                placeholder='Select engineer'
                value={engineer || ""}
                classNamePrefix='si-select'
                options={serviceEngineers}
                getOptionLabel={op => op.name}
                getOptionValue={op => op.id}
                onChange={value => setEngineer(value)}
              />
              <Button
                fullWidth
                variant='contained'
                color='primary'
                size='small'
                disabled={!(engineer && engineer.id)}
                onClick={assignEngineer}
              >
                Update details
              </Button>
            </div>
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
