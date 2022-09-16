/** @format */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimeLine from '../../core/time-line';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import './index.scss';
import { formatDate, convertToCamelCaseFromUnderScore } from '../../utils';
import { DATE_FORMATS, TICKET_STAGES } from '../../utils/constants';
import { convertPartsToString } from './helper';

const TimeLineInfo = ({ ticketDetails, openForm, loadData, timeline }) => {
  const { id } = useParams();

  const updateDateOfInspection = (date) => {
    let payload = {
      dateOfInspection: new Date(date).toISOString(),
    };
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.TICKETS}/${id}`,
      payload
    ).then((response) => {
      loadData();
    });
  };

  const getTimeLine = (timelineDetails, index) => {
    const { stage, stageDetails } = timelineDetails;

    let stageDetailsObj = {};
    try {
      stageDetailsObj = JSON.parse(stageDetails);
    } catch (err) {}

    switch (stage) {
      case TICKET_STAGES.COMPLAINT_FORM_SUBMITTED:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>
              Created on{' '}
              {formatDate(
                stageDetailsObj.complaintRecordCreatedAt,
                DATE_FORMATS['DD-MM-YYYY']
              )}{' '}
              by {stageDetailsObj.createdBy.substr(0, 8)}
            </span>
            <div className='line2 clickable' onClick={openForm}>
              View form
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.ASSIGN_SE:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>Service Engineer Assigned</span>
            <div className='line2'>{stageDetailsObj.name || '-'}</div>
          </TimeLine>
        );
      case TICKET_STAGES.UPDATE_DEFECT_CODE:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>Defect code updated</span>
            <div className='line2'>
              {(stageDetailsObj.defectCode &&
                `${stageDetailsObj.defectCode.code} - ${stageDetailsObj.defectCode.description}`) ||
                '-'}
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.UPDATE_ACTION_CODE:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>Action code updated</span>
            <div className='line2'>
              {(stageDetailsObj.actionCode &&
                `${stageDetailsObj.actionCode.code} - ${stageDetailsObj.actionCode.description}`) ||
                '-'}
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.ENGINE_REPLACEMENT:
        return (
          <TimeLine
            displayLine={index !== timeline.length - 1}
            key={index}
            className='time-c-extra'
          >
            <span className='line1'>Engine replacement details</span>
            <div className='line2'>
              <div> {`Replacement By: ${stageDetailsObj.replacementBy}`}</div>
              <div>
                {`Engine Type: ${convertToCamelCaseFromUnderScore(
                  stageDetailsObj.engineType
                )}`}
              </div>
              <div>
                {`Engine Type Value: ${stageDetailsObj.engineTypeValue}`}
              </div>
              <div> {`Extra Text: ${stageDetailsObj.extraText}`}</div>
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.PARTS_REPLACEMENT:
        return (
          <TimeLine
            displayLine={index !== timeline.length - 1}
            key={index}
            className='time-c-extra'
          >
            <span className='line1'>Part/s replacement details</span>
            <div className='line2'>
              <div>
                {' '}
                {`Mode :${convertToCamelCaseFromUnderScore(
                  stageDetailsObj.mode
                )}`}
              </div>
              <div> {`Scope:${stageDetailsObj.scope}`}</div>
              <div>
                {`Parts :${convertPartsToString(
                  stageDetailsObj.partsReplacementIds || []
                )}`}
              </div>
              <div> {`Extra :${stageDetailsObj.extra}`}</div>
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.COMMENT:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>Comment</span>
            <div className='line2'>{stageDetailsObj.comment || '-'}</div>
          </TimeLine>
        );
      case TICKET_STAGES.TICKET_UPDATED:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>
              {timelineDetails.description || 'Ticket Updated'}
            </span>
            <div className='line2'>
              {stageDetailsObj.reason
                ? stageDetailsObj.reason
                : stageDetailsObj.status || '-'}
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.OUT_OF_WARRANTY:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>
              {timelineDetails.description || 'Ticket Updated'}
            </span>
            <div className='line2'>
              {stageDetailsObj.extendedTechnicalSupport ? 'Yes' : 'No'}
            </div>
          </TimeLine>
        );
      case TICKET_STAGES.ATTACHMENT:
        return (
          <TimeLine displayLine={index !== timeline.length - 1} key={index}>
            <span className='line1'>Attachment</span>
            <div className='line2'>
              <a href={stageDetailsObj.url} target='_blank'>
                Open attachment
              </a>
            </div>
          </TimeLine>
        );
      default:
        return null;
    }
  };

  const onDateChange = (event, b) => {
    if (compareDates(event)) {
      return;
    }
    updateDateOfInspection(event);
  };

  const compareDates = (date) => {
    if (ticketDetails.dateOfInspection) {
      let date1 = formatDate(
        ticketDetails.dateOfInspection,
        DATE_FORMATS['DD.MM.YYYY']
      );
      let date2 = formatDate(date, DATE_FORMATS['DD.MM.YYYY']);
      return date1 === date2 || !date;
    }
    return false;
  };
  return (
    <div className='time-line-info-container'>
      <div className='inspection-date'>
        <span>Date of inspection</span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            inputFormat='dd/MM/yyyy'
            value={ticketDetails.dateOfInspection || null}
            onChange={(a, b, c) => {
              console.log(a, b, c);
            }}
            minDate={new Date()}
            onClose={(event) => {}}
            onAccept={(event) => onDateChange(event, 'accept')}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className='time-line'>
        {timeline.map((timelineDetails, index) =>
          getTimeLine(timelineDetails, index)
        )}
      </div>
    </div>
  );
};

export default TimeLineInfo;
