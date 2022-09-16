import React, { useState, useEffect } from "react";
import "./index.scss";
import SiTable from "../../core/table";
import { getHeaderConfig } from "./config";
import CustomModal from "../../core/modal";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getOfflineData } from "../../utils/offline-services";
const Actions = () => {
  const navigate = useNavigate();
  const [actions, setActions] = useState({
    results: [],
  });
  const [addAction, setAddAction] = useState(false);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState({
    type: "action",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (!getOfflineData("user")) {
      navigate("/login");
    } else {
      loadData(filters);
    }
  }, []);
  const addActionFormHandler = () => {
    setAddAction(true);
  };
  const addCodeHandler = (event) => {
    setCode(event.target.value);
  };
  const addDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const payload = {
    type: "action",
    code: code,
    description: description,
  };
  //Add New Action
  const formSubmitHandler = () => {
    if (payload.code !== "" && payload.description !== "") {
      invokeApi(
        HTTP_METHODS.POST,
        `${HOSTNAME}${REST_URLS.CODES}action`,
        payload,
        { active: true }
      ).then((response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData(filters);
          setCode("");
          setDescription("");
          setAddAction(false);
        }
      });
    }
  };
  //Show All Actions
  const loadData = (filters) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.List_CODES}`,
      null,
      filters
    ).then((response) => {
      if (response) {
        setActions(response);
      }
    });
  };
  return (
    <>
      <div className="action-container">
        <div className="button-div">
          <Button
            variant="contained"
            className="button"
            onClick={addActionFormHandler}
          >
            Add Action Code
          </Button>
        </div>

        <SiTable
          header={getHeaderConfig(loadData, filters)}
          data={actions.results || []}
          pageCount={actions.totalPages}
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
      {addAction && (
        <CustomModal
          title="New Action Code"
          contentClassName={{ headerBackgroundColor: "#102f77" }}
          onClose={() => {
            setAddAction(false);
          }}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              id="code"
              label="Code"
              sx={{ m: 1 }}
              onChange={addCodeHandler}
              value={code}
              size='small'
            />
            <TextField
              fullWidth
              id="description"
              label="Description"
              multiline
              sx={{ m: 1 }}
              rows={4}
              onChange={addDescriptionHandler}
              value={description}
              size='small'
            />
            <Stack direction="row" spacing={2} sx={{ m: 1 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={formSubmitHandler}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  setAddAction(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
    </>
  );
};

export default Actions;
