import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./index.scss";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import { getOfflineData } from "../../utils/offline-services";
import {
  getFormConfig,
  isFormValid,
  formatFreeServicesPayload,
  convertFreeServiceObjectToArray
} from "./helper";
import FreeServices from "./free-services";
import PastHistory from "./past-history";
import Select from "react-select";

const sx = {
  input: {
    background: "#fff",
    borderColor: "gray"
  }
};

const CreateTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [addFreeServices, setAddFreeServices] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [oemsList, setOemsList] = useState([]);
  const [pastHistory, setPastHistory] = useState([]);
  const [ticketDetails, setTicketDetails] = useState({
    attachments: "no",
    actionTakenByOem: getOfflineData("user").name
  });

  useEffect(() => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.LIST_OEMS}`, null).then(
      response => {
        if (Array.isArray(response) && response) {
          let oems = response.map(r => {
            return {
              ...r,
              label: r.name,
              value: r.id
            };
          });
          setOemsList(oems);
          if (id) {
            loadData();
          }
        }
      }
    );
  }, []);

  const loadData = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.COMPLAINT}/${id}`,
      null
    ).then(response => {
      if (response) {
        setTicketDetails(response);
      }
      if (response.pastHistory) {
        setPastHistory(response.pastHistory || []);
      }
      if (response.freeServiceDetails) {
        setServicesList(
          convertFreeServiceObjectToArray(response.freeServiceDetails || [])
        );
      }
    });
  };

  const onInputChange = event => {
    setTicketDetails({
      ...ticketDetails,
      [event.target.name]: event.target.value
    });
  };

  const onSubFormChange = (event, dataLabel) => {
    setTicketDetails({
      ...ticketDetails,
      [dataLabel]: {
        ...ticketDetails[dataLabel],
        [event.target.name]: event.target.value
      }
    });
  };

  const createTicket = () => {
    let errors = isFormValid(ticketDetails);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let payload = ticketDetails;

    payload.freeServiceDetails = formatFreeServicesPayload(servicesList);
    payload.pastHistory = pastHistory;
    payload.oemName = ticketDetails.oemName.label;
    invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.COMPLAINT}`,
      payload
    ).then(response => {
      if (response.message) {
        toast.error("Failed to create ticket");
      } else {
        navigate("/");
      }
    });
  };

  const updateTicket = () => {
    let errors = isFormValid(ticketDetails);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let payload = ticketDetails;
    payload.freeServiceDetails = formatFreeServicesPayload(servicesList);
    payload.pastHistory = pastHistory;
    payload.oemName = ticketDetails.oemName.label;
    delete payload.active;
    delete payload.archive;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.oem;
    delete payload.id;

    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}${REST_URLS.COMPLAINT}/${id}`,
      payload
    ).then(response => {
      if (response.message) {
        toast.error("Failed to create ticket");
      } else {
        navigate("/");
      }
    });
  };

  const onDelete = index => {
    servicesList.splice(index, 1);
    setServicesList([...servicesList]);
  };

  const onDeleteHistory = index => {
    pastHistory.splice(index, 1);
    setServicesList([...pastHistory]);
  };

  const inputElements = config => {
    if (config.type === "FREE_SERVICES") {
      return (
        <div className='form-row' key={config.label}>
          <span className='label'>{config.label}</span>
          <div className='sub-form'>
            <Button
              variant='text'
              color='primary'
              onClick={() => setAddFreeServices(true)}
            >
              Add free services
            </Button>
            <div>
              {servicesList && servicesList.length > 0 && (
                <div className='service-row'>
                  <div>Service</div>
                  <div>Date</div>
                  <div>Hours</div>
                  <div></div>
                </div>
              )}
              {servicesList &&
                servicesList.map((service, index) => {
                  return (
                    <div className='service-row'>
                      <span>{(service.name && service.name.label) || ""}</span>
                      <span>{service.date}</span>
                      <span>{service.runningHours}</span>
                      <IconButton
                        size='small'
                        onClick={() => onDeleteHistory(index)}
                      >
                        <CancelIcon fontSize='small' />
                      </IconButton>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }

    if (config.type === "PAST_HISTORY") {
      return (
        <div className='form-row' key={config.label}>
          <span className='label'>{config.label}</span>
          <div className='sub-form'>
            <Button
              variant='text'
              color='primary'
              onClick={() => setAddHistory(true)}
            >
              Add past history
            </Button>
            <div>
              {pastHistory.length > 0 && (
                <div className='service-row'>
                  <div>Date Of Failure</div>
                  <div>Complaint Reported</div>
                  <div>Hours</div>
                  <div></div>
                </div>
              )}
              {pastHistory.map((h, index) => {
                return (
                  <div className='service-row'>
                    <span>{h.dateOfFailure}</span>
                    <span>{h.complaintReported}</span>
                    <span>{h.hours}</span>
                    <IconButton size='small' onClick={() => onDelete(index)}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (config.subForm) {
      return (
        <div className='form-row' key={config.label}>
          <span className='label'>{config.label}</span>
          <div className='sub-form'>
            {config.subForm.map(subConfig => {
              return (
                <TextField
                  key={subConfig.label}
                  placeholder={subConfig.label}
                  size='small'
                  value={subConfig.value}
                  name={subConfig.name}
                  type={subConfig.type}
                  sx={sx}
                  onChange={event => onSubFormChange(event, config.name)}
                  error={config.error}
                  helperText={config.error ? "Required" : ""}
                />
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className='form-row' key={config.label}>
        <span className='label'>{config.label}</span>
        {config.type === "select" ? (
          <Select
            placeHolder='Name of OEM'
            options={oemsList}
            value={config.value}
            onChange={value => {
              onInputChange({
                target: {
                  name: "oemName",
                  value: value
                }
              });
            }}
          />
        ) : (
          <TextField
            size='small'
            value={config.value}
            name={config.name}
            type={config.type}
            sx={sx}
            onChange={onInputChange}
            error={config.error}
            helperText={config.error ? "Required" : ""}
          />
        )}
      </div>
    );
  };

  const saveServices = newService => {
    setServicesList([...servicesList, newService]);
    setAddFreeServices(false);
  };

  const saveHistory = newHistory => {
    setPastHistory([...pastHistory, newHistory]);
    setAddHistory(false);
  };

  return (
    <div className='create-tickets'>
      <div className='back-container'>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
        </IconButton>
        <span className='s-heading'>{id ? "Update ticket" : "New Ticket"}</span>
      </div>
      <div className='create-ticket-form'>
        {getFormConfig(ticketDetails, errors).map(config => {
          return inputElements(config);
        })}

        <div className='buttons'>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={id ? updateTicket : createTicket}
          >
            {id ? "Update ticket" : "Create Ticket"}
          </Button>
        </div>
      </div>
      {addFreeServices && (
        <FreeServices
          handleClose={() => setAddFreeServices(false)}
          onSave={saveServices}
        />
      )}
      {addHistory && (
        <PastHistory
          handleClose={() => setAddHistory(false)}
          onSave={saveHistory}
        />
      )}
    </div>
  );
};
export default CreateTicket;
