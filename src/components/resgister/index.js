/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './index.scss';
import { invokeApi, HTTP_METHODS } from '../../utils/http-service';
import { HOSTNAME, REST_URLS } from '../../utils/endpoints';
import { setOfflineData, getOfflineData } from '../../utils/offline-services';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const onInputChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const login = () => {
    let payload = {
      name: loginDetails.name,
      email: loginDetails.email,
      password: loginDetails.password,
    };
    invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.REGISTER}`,
      payload
    ).then((response) => {
      if (response.message) {
        toast.error(response.message);
        setLoginDetails({
          ...loginDetails,
          errorMsg: response.message,
        });
      } else {
        navigate('/login');
        toast.info("Register successfull");
      }
    });
  };

  return (
    <div className='login-container'>
      <div className='left'>
      <img src={require('../../resources/info.png')} />
      </div>
      <div className='right'>
        <div className='login-form'>
          <div className='title'>Login</div>
          <TextField
            size='small'
            label='Name'
            name='name'
            value={loginDetails.name}
            onChange={onInputChange}
          />
          <TextField
            size='small'
            label='Email'
            name='email'
            value={loginDetails.email}
            onChange={onInputChange}
          />
          <TextField
            size='small'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={loginDetails.password}
            onChange={onInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size='small'
            label='Confirm Password'
            type={showPassword ? 'text' : 'password'}
            name='confirmPassword'
            value={loginDetails.confirmPassword}
            onChange={onInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={login}
            disabled={!loginDetails.email || !loginDetails.password}
          >
            Register
          </Button>
          <Button
            variant='text'
            color='primary'
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </Button>
          {loginDetails.errorMsg && (
            <span className='error-msg'>{loginDetails.errorMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
