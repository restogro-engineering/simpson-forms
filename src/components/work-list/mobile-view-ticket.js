import React from "react";
import "./index.scss";
import { formatDate } from "../../utils";
import { DATE_FORMATS } from "../../utils/constants";
const TicketCard = ({
  ticketId,
  status,
  createdBy,
  assignedTo,
  createdOn,
  onClick
}) => {
  return (
    <div>
      <div className='card'>
        <p className='card-content ticket-id' onClick={onClick}>
          {ticketId && ticketId.substr(0, 8)}
        </p>
        <p className='card-content label'>
          Status :<span className='value'> {status}</span>
        </p>
        <p className='card-content label'>
          Created By :<span className='value'> {createdBy}</span>
        </p>
        <p className='card-content label'>
          Assigned to : <span className='value'>{assignedTo}</span>
        </p>
        <p className='card-content label'>
          Created On :
          <span className='value'>
            {" "}
            {formatDate(createdOn, DATE_FORMATS["DD-MM-YYYY"])}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TicketCard;
