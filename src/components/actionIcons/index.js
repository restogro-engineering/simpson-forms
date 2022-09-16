/** @format */

import React, { useState } from 'react';
import CustomModal from '../../core/modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
const ActionIcons = ({
  id,
  Code,
  Description,
  type,
  loadData,
  name,
  email,
  filters,
}) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [code, setCode] = useState(Code);
  const [description, setDescription] = useState(Description);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const editHandler = () => {
    setEdit(true);
    setCode(Code);
    setDescription(Description);
  };
  const deleteHandler = () => {
    setDel(true);
  };
  const addCodeHandler = (event) => {
    setCode(event.target.value);
  };
  const addDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const editNameHandler = (event) => {
    setEditName(event.target.value);
  };
  const editEmailHandler = (event) => {
    setEditEmail(event.target.value);
  };
  const payload = {
    type: type,
    code: code,
    description: description,
  };
  const serviceEngPayload = {
    name: editName,
    email: editEmail,
  };
  //Edit data in Codes
  const editDataHandler = () => {
    invokeApi(HTTP_METHODS.PUT, `${HOSTNAME}/v1/codes/${id}`, payload).then(
      (response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData(filters);
          setEdit(false);
        }
      }
    );
  };
  //Delete data in Codes
  const deleteDataHandler = () => {
    payload.active = false;
    invokeApi(HTTP_METHODS.PUT, `${HOSTNAME}/v1/codes/${id}`, payload).then(
      (response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData(filters);
          setDel(false);
        }
      }
    );
  };
  //Edit Data in ServiceEngineers
  const editServiceEngHandler = () => {
    invokeApi(
      HTTP_METHODS.PUT,
      `${HOSTNAME}/v1/users/${id}`,
      serviceEngPayload
    ).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData(filters);
        setEdit(false);
      }
    });
  };
  //Delete Data in ServiceEngineers
  const deleteServiceEngHandler = () => {
    invokeApi(HTTP_METHODS.DELETE, `${HOSTNAME}/v1/users/${id}`).then(
      (response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          loadData(filters);
          setDel(false);
        }
      }
    );
  };
  //Delete emailId in mailing List
  const deleteMailHandler = (id) => {
    invokeApi(
      HTTP_METHODS.DELETE,
      `${HOSTNAME}${REST_URLS.MAILING_LIST}/delete-email/${id}`
    ).then((response) => {
      if (response.message) {
        toast.error(response.message);
      } else {
        loadData();
      }
    });
  };
  let closeEditModal = () => {
    setEdit(false);
  };
  let CloseDeleteModal = () => {
    setDel(false);
  };
  const confirmDelete = () => {
    if (type === 'SERVICE_ENGINEER') {
      deleteServiceEngHandler();
    } else if (type === 'mailing list') {
      deleteMailHandler(id);
    } else {
      deleteDataHandler();
    }
    setDel(false);
  };
  return (
    <div>
      <Stack direction='row' spacing={3}>
        {type !== 'mailing list' && (
          <IconButton sx={{ p: 0 }} onClick={editHandler}>
            <EditIcon id='edit' />
          </IconButton>
        )}

        {type !== 'part' && (
          <IconButton onClick={deleteHandler} id='delete' sx={{ p: 0 }}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      {edit && type !== 'SERVICE_ENGINEER' && type !== 'mailing list' && (
        <CustomModal
          title='Edit Code'
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={closeEditModal}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
            {type !== 'part' && (
              <TextField
                fullWidth
                id='code'
                label='Code'
                sx={{ m: 1 }}
                onChange={addCodeHandler}
                value={code}
                size='small'
              />
            )}
            <TextField
              fullWidth
              id='description'
              label='Description'
              multiline
              sx={{ m: 1 }}
              rows={4}
              onChange={addDescriptionHandler}
              value={description}
              size='small'
            />
            <Stack direction='row' spacing={2} sx={{ m: 1 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={editDataHandler}
              >
                Edit
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
      {edit && type === 'SERVICE_ENGINEER' && (
        <CustomModal
          title='Edit Service Engineer'
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={closeEditModal}
        >
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
            <TextField
              fullWidth
              id='name'
              label='Name'
              multiline
              sx={{ m: 1 }}
              onChange={editNameHandler}
              value={editName}
              size='small'
            />
            <TextField
              fullWidth
              id='email'
              label='Email'
              sx={{ m: 1 }}
              onChange={editEmailHandler}
              value={editEmail}
              type='email'
              size='small'
            />
            <Stack direction='row' spacing={2} sx={{ m: 1 }}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={editServiceEngHandler}
              >
                Add
              </Button>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </CustomModal>
      )}
      {del && (
        <CustomModal
          title='Confirm Delete'
          contentClassName={{ headerBackgroundColor: '#102f77' }}
          onClose={CloseDeleteModal}
        >
          <h3>Are you sure to delete this item?</h3>
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' onClick={() => setDel(false)}>
              Cancel
            </Button>
            <Button variant='contained' color='error' onClick={confirmDelete}>
              Delete
            </Button>
          </Stack>
        </CustomModal>
      )}
    </div>
  );
};
export default ActionIcons;
