/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import BasicInfo from './basic-info';
import TimeLineInfo from './timeline-info';
import FormDetails from './form-details';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { useParams } from 'react-router';
import ViewTicket from '../past-ticket/view-ticket';
import { Drawer } from '@mui/material';
import { TICKET_STAGES } from '../../utils/constants';
import PreDefectCodeStage from './pre-defect-code-stage';
import { toast } from 'react-toastify';
const TicketDetails = () => {
  const { id } = useParams();
  const [timeline, setTimeline] = useState([]);
  const [ticketDetails, setTicketDetails] = useState({});
  const [viewComplaint, setViewComplaint] = useState(null);
  const [complaintForm, setComplaintForm] = useState({});
  const [serviceEngineers, setServiceEngineers] = useState([]);
  const [codes, setCodes] = useState([]);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.STAGE_VIEW}/${id}`,
      null
    ).then((response) => {      
      if (response.code === 404) {
        toast.error('Invalid ticket');
        return;
      }
      if (response.ticket) {
        setTicketDetails(response.ticket);
        loadCodes(response.ticket.stage);
        loadServiceEngineers(response.ticket.stage);
      }
      if (response.complaintForm) {
        setComplaintForm(response.complaintForm);
      }
      if (response.timeline && Array.isArray(response.timeline)) {
        setTimeline(response.timeline);
      }
    });
  };

  const loadCodes = (stage) => {
    if (
      stage !== TICKET_STAGES.UPDATE_ACTION_CODE &&
      stage !== TICKET_STAGES.UPDATE_DEFECT_CODE
    ) {
      return;
    }
    let type = 'defect';
    if (stage === TICKET_STAGES.UPDATE_ACTION_CODE) {
      type = 'action';
    }
    loadParts();

    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.CODES}${type}`,
      null
    ).then((response) => {
      if (response.results) {
        setCodes(response.results);
      }
    });
  };

  const loadParts = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.CODES}part`, null).then(
      (response) => {
        if (response) {
          setParts(response);
        }
      }
    );
  };

  const loadServiceEngineers = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.SERVICE_ENGINEER}`,
      null,
      {
        role: 'SERVICE_ENGINEER',
        page: 1,
        limit: 1000,
      }
    ).then((response) => {
      if (response.results) {
        setServiceEngineers(response.results);
      }
    });
  };

  return (
    <div className='ticket-details-container'>
      <div className='left-section'>
        <BasicInfo
          ticketDetails={ticketDetails}
          serviceEngineers={serviceEngineers}
          loadData={loadData}
        />
      </div>
      <div className='middle-section'>
        <TimeLineInfo
          ticketDetails={ticketDetails}
          timeline={timeline}
          openForm={() => setViewComplaint(true)}
          onDateChange={loadData}
          loadData={loadData}
        />
      </div>
      <div className='right-section'>
        <FormDetails
          loadData={loadData}
          codes={codes}
          parts={parts}
          ticketDetails={ticketDetails}
          serviceEngineers={serviceEngineers}
        />
      </div>
      {viewComplaint && (
        <Drawer anchor='right' open={!!viewComplaint}>
          <ViewTicket
            details={complaintForm || {}}
            onClose={() => setViewComplaint(null)}
          />
        </Drawer>
      )}
      <PreDefectCodeStage
        ticketDetails={ticketDetails}
        id={id}
        loadData={loadData}
      />
    </div>
  );
};

export default TicketDetails;
