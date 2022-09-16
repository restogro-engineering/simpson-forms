import React, { useState, useEffect } from "react";
import "./index.scss";
import SiTable from "../../core/table";
import { getHeaderConfig } from "./config";
import { invokeApi, HTTP_METHODS } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { getOfflineData } from "../../utils/offline-services";
import { toast } from "react-toastify";
import CustomModal from "../../core/modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const Defects = () => {
  const navigate = useNavigate();
  const [addDefects, setAddDefects] = useState(false);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [defects, setDefects] = useState({
    results: [],
  });
  const [filters, setFilters] = useState({
    type: "defect",
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
  const addDefectFormHandler = () => {
    setAddDefects(true);
  };
  const addCodeHandler = (event) => {
    setCode(event.target.value);
  };
  const addDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const payload = {
    type: "defect",
    code: code,
    description: description,
  };
  //Show All defects
  const loadData = (filters) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.List_CODES}`,
      null,
      filters
    ).then((response) => {
      if (response) {
        setDefects(response);
      }
    });
  };
  //Add New defect
  const formSubmitHandler = () => {
    if (payload.code !== "" && payload.description !== "") {
      invokeApi(
        HTTP_METHODS.POST,
        `${HOSTNAME}${REST_URLS.CODES}defect`,
        payload,
        { active: true }
      ).then((response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData(filters);
          setCode("");
          setDescription("");
          setAddDefects(false);
        }
      });
    }
  };
  return (
    <>
      <div className="defect-container">
        <div className="button-div">
          <Button
            variant="contained"
            className="button"
            onClick={addDefectFormHandler}
          >
            Add Defect Code
          </Button>
        </div>
        <SiTable
          header={getHeaderConfig(loadData, filters)}
          data={defects.results || []}
          pageCount={defects.totalPages}
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
      {addDefects && (
        <CustomModal
          title="New Defect Code"
          contentClassName={{ headerBackgroundColor: "#102f77" }}
          onClose={() => setAddDefects(false)}
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
                  setAddDefects(false);
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

export default Defects;
