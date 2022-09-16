import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { TextField } from '@mui/material';
import Select from 'react-select';
import './index.scss';
import SiTable from '../../core/table';
import { HeaderConfig } from './config';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import ViewTicket from './view-ticket';
import { APPROVAL_LIST } from '../../utils/mocks';
import CustomModal from '../../core/modal';
const WorkList = () => {
  const navigate = useNavigate();
  const [pastTickets, setPastTickets] = useState({
    results: APPROVAL_LIST,
  });
  const [viewTicket, setViewTicket] = useState(null);
  const [openComments, setOpenComments] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: '-createdAt',
  });

  const loadData = (filters) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.TICKETS}`,
      null,
      filters
    ).then((response) => {
      if (response.results) {
        setPastTickets(response);
      }
    });
  };

  const onRowClick = (data) => {
    // navigate(`/details/${data.id}`);
    const { comments = [] } = data;
    setOpenComments(comments);
  };

  return (
    <>
      <div className="past-tickets-container">
        <div className="si-hide-mobile">
          <SiTable
            header={HeaderConfig}
            data={pastTickets.results || []}
            pageCount={pastTickets.totalPages}
            onClick={onRowClick}
            onChange={(event, page) => {
              setFilters({
                ...filters,
                page,
              });
              loadData({
                ...filters,
                page,
              });
            }}
          ></SiTable>
        </div>
        <div className="si-hide-web ">
          <div>
            <div className="ticket-container-mobile">
              <TextField
                variant="outlined"
                size="small"
                className="search-field"
              />
              <Select placeHolder="Filter by" />
            </div>
          </div>
        </div>

        <Drawer anchor="right" open={!!viewTicket}>
          <ViewTicket
            details={viewTicket || {}}
            onClose={() => setViewTicket(null)}
          />
        </Drawer>
        {openComments && (
          <CustomModal title="Comments" onClose={() => setOpenComments(null)}>
            <div className="comment-row">
              <span>Comment</span>
              <spam>Comment By</spam>
              <spam>Date</spam>
            </div>
            {openComments.map((comment) => {
              return (
                <div className="comment-row">
                  <span>{comment.msg} </span>
                  <spam>{comment.by}</spam>
                  <spam>{comment.date}</spam>
                </div>
              );
            })}
          </CustomModal>
        )}
      </div>
    </>
  );
};

export default WorkList;
