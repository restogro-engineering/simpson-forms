import React, { useState, useEffect } from "react";
import "./index.scss";
import CustomModal from "../../core/modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getHeaderConfig } from "./config";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { getOfflineData } from "../../utils/offline-services";
import Box from "@mui/material/Box";
import SiTable from "../../core/table";
import { toast } from "react-toastify";
const MailingList = () => {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();
  const [addEmail, setAddEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!getOfflineData("user")) {
      navigate("/login");
    } else {
      loadData();
    }
  }, []);
  const emailHandler = (event) => {
    setAddEmail(event.target.value);
  };
  const payload = {
    email: addEmail,
  };
  //load email Ids
  const loadData = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.MAILING_LIST}/list-emails`,
      null
    ).then((response) => {
      if (response) {
        setEmails(response);
      }
    });
  };
  //Add Email
  const formSubmitHandler = () => {
    if (addEmail !== "") {
      invokeApi(
        HTTP_METHODS.POST,
        `${HOSTNAME}${REST_URLS.MAILING_LIST}/add-email`,
        payload,
        { active: true }
      ).then((response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData();
          setAddEmail("");
          setIsModalOpen(false);
        }
      });
    }
  };
  return (
    <div className="mailingList-container">
      <div className="complaint-container">
        <div className="button-div">
          <Button
            variant="contained"
            className="button"
            onClick={() => setIsModalOpen(true)}
          >
            Add Mail
          </Button>
        </div>
        <SiTable
          header={getHeaderConfig(loadData)}
          data={emails || []}
        ></SiTable>
      </div>
      {isModalOpen && (
        <CustomModal
          title="Add New Mail"
          contentClassName={{ headerBackgroundColor: "#102f77" }}
          onClose={() => setIsModalOpen(false)}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              id="email"
              label="Email"
              sx={{ m: 1 }}
              onChange={emailHandler}
              value={addEmail}
              type="email"
              size='small'
            />
            <Stack direction="row" spacing={2} sx={{ m: 1 }}>
              <Button
                variant="contained"
                color='primary'
                fullWidth
                onClick={formSubmitHandler}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color='primary'
                fullWidth
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
    </div>
  );
};

export default MailingList;
