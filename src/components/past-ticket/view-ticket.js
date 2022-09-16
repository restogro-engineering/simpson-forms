/** @format */

import React from 'react';
import { SERVICE_LABEL_MAP } from './config';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import './index.scss';
import { formatDate } from '../../utils';
import { DATE_FORMATS } from '../../utils/constants';

const ViewTicket = ({ details, onClose }) => {
  const {
    oemEngineLocation = {},
    freeServiceDetails = {},
    pastHistory = [],
  } = details;

  const location =
    oemEngineLocation &&
    `${oemEngineLocation.tractorAddress || ''},${
      oemEngineLocation.pinCode || ''
    }`;

  return (
    <div className='view-ticket-container'>
      <div className='close-btn-title'>
        <IconButton onClick={onClose}>
          <CancelIcon
            style={{
              color: '#fff',
              fontSize: 40,
            }}
          />
        </IconButton>
        <div>Ticket: {details.id && details.id.substr(0, 8)}</div>
      </div>
      <div className='details-table'>
        <div className='data-row'>
          <span>Name of OEM</span>
          <span>{details.oemName}</span>
        </div>
        <div className='data-row'>
          <span>Service Eng Name</span>
          <span>{details.oemServiceEngineerName}</span>
        </div>
        <div className='data-row'>
          <span>Service Eng Contact</span>
          <span>{details.oemServiceEngineerContact}</span>
        </div>
        <div className='data-row'>
          <span>Engine Location</span>
          <span>{location}</span>
        </div>
        <div className='data-row'>
          <span>OEM Dealer Name</span>
          <span>{details.oemDealerName}</span>
        </div>
        <div className='data-row'>
          <span>Engine Serial Number</span>
          <span>{details.engineSerialNumber}</span>
        </div>
        <div className='data-row'>
          <span>Unit Serial Number</span>
          <span>{details.unitSerialNumber}</span>
        </div>
        <div className='data-row'>
          <span>Date of Sale</span>
          <span>
            {formatDate(details.dateOfSale, DATE_FORMATS['DD-MM-YYYY'])}
          </span>
        </div>
        <div className='data-row'>
          <span>Customer Complaint Date</span>
          <span>
            {formatDate(
              details.customerComplaintDate,
              DATE_FORMATS['DD-MM-YYYY']
            )}
          </span>
        </div>
        <div className='data-row'>
          <span>Customer Complaint Nature</span>
          <span>{details.natureOfCustomerComplaint}</span>
        </div>
        <div className='data-row'>
          <span>HMR</span>
          <span>{details.hmr}</span>
        </div>
        <div className='data-row'>
          <span>Customer Name</span>
          <span>{details.customerName}</span>
        </div>
        <div className='data-row'>
          <span>Customer Contact</span>
          <span>{details.customerContact}</span>
        </div>
        <div className='data-row'>
          <span>Past History</span>
          <div className='free-services'>
            {pastHistory.length > 0 && (
              <div className='service-row'>
                <div>Date Of Failure</div>
                <div>Complaint Reported</div>
                <div>Hours</div>
              </div>
            )}
            {pastHistory.map((h) => {
              return (
                <div className='service-row'>
                  <span>
                    {formatDate(h.dateOfFailure, DATE_FORMATS['DD-MM-YYYY'])}
                  </span>
                  <div>{h.complaintReported}</div>
                  <div>{h.hours}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='data-row auto-height'>
          <span>Free services</span>
          <div className='free-services'>
            {Object.keys(freeServiceDetails).length > 0 && (
              <div className='service-row'>
                <div>Service</div>
                <div>Date</div>
                <div>Hours</div>
              </div>
            )}

            {Object.keys(freeServiceDetails).map((key) => {              
              return (
                <div
                  className={
                    key === 'firstService' &&
                    freeServiceDetails[key]['runningHours'] > 50
                      ? 'service-row error'
                      : 'service-row'
                  }
                >
                  <div>{SERVICE_LABEL_MAP[key]}</div>
                  <span>
                    {formatDate(
                      freeServiceDetails[key]['date'],
                      DATE_FORMATS['DD-MM-YYYY']
                    )}
                  </span>
                  <div>{freeServiceDetails[key]['runningHours']}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='data-row'>
          <span>Investigation Details By OEM</span>
          <span>{details.investigationDetailsByOem}</span>
        </div>
        <div className='data-row'>
          <span>Remarks</span>
          <span>{details.remarks}</span>
        </div>
        <div className='data-row'>
          <span>Customer Regular Application</span>
          <span>{details.customerRegularApplication}</span>
        </div>
        <div className='data-row'>
          <span>Complaint Observed Application</span>
          <span>{details.applicationWhileComplaintObserved}</span>
        </div>
        <div className='data-row'>
          <span>Soil Condition</span>
          <span>{details.soilCondition}</span>
        </div>
        <div className='data-row'>
          <span>Attachments</span>
          <span>{details.attachments}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
