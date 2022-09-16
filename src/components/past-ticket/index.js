import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { TextField } from "@mui/material";
import Select from "react-select";
import "./index.scss";
import SiTable from "../../core/table";
import { HeaderConfig } from "./config";
import { getOfflineData } from "../../utils/offline-services";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import ViewTicket from "./view-ticket";
import TicketCard from "./mobile-view-ticket";
import MenuIcon from "@mui/icons-material/Menu";
const PastTickets = () => {
  const navigate = useNavigate();
  const [pastTickets, setPastTickets] = useState({
    results: []
  });
  const [viewTicket, setViewTicket] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "-createdAt"
  });

  useEffect(() => {
    if (!getOfflineData("user")) {
      navigate("/login");
    } else {
      loadData(filters);
    }
  }, []);

  const loadData = filters => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.TICKETS}`,
      null,
      filters
    ).then(response => {
      if (response.results) {
        setPastTickets(response);
      }
    });
  };

  const onRowClick = data => {
    navigate(`/details/${data.id}`);
  };

  return (
    <>
      <div className='past-tickets-container'>
        {/* <div className='filters-row si-hide-mobile'>
          <TextField variant='outlined' size='small' />
          <Select placeHolder='Sort by' />
          <Select placeHolder='Filter by' />
        </div> */}
        <div className='si-hide-mobile'>
          <SiTable
            header={HeaderConfig}
            data={pastTickets.results || []}
            pageCount={pastTickets.totalPages}
            onClick={onRowClick}
            onChange={(event, page) => {
              setFilters({
                ...filters,
                page
              });
              loadData({
                ...filters,
                page
              });
            }}
          ></SiTable>
        </div>
        <div className='si-hide-web '>
          <div>
            <div className='ticket-container-mobile'>
              <TextField
                variant='outlined'
                size='small'
                className='search-field'
              />
              <Select placeHolder='Filter by' />
            </div>
          </div>
          {pastTickets.results.map(ticket => {
            return (
              <div key={ticket.id}>
                <div>
                  <TicketCard
                    onClick={() => onRowClick(ticket)}
                    ticketId={ticket.id}
                    status={ticket.status}
                    createdBy={ticket.createdBy}
                    assignedTo={ticket.serviceEngineer}
                    createdOn={ticket.createdAt}
                  ></TicketCard>
                </div>
              </div>
            );
          })}
        </div>

        <Drawer anchor='right' open={!!viewTicket}>
          <ViewTicket
            details={viewTicket || {}}
            onClose={() => setViewTicket(null)}
          />
        </Drawer>
      </div>
    </>
  );
};

export default PastTickets;
