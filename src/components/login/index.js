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
import { APP_USERS } from '../../utils/mock';

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (getOfflineData('user')) {
      navigate('/');
    }
  }, []);

  const onInputChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const login = () => {
    const user = APP_USERS.find((u) => u.email === loginDetails.email);
    if (user) {
      setOfflineData('user', user);
      setOfflineData('tokens', { tokens: {} });      
      navigate('/');
    } else {
      setLoginDetails({
        ...loginDetails,
        errorMsg: 'Invalid username/password',
      });
    }

    return;

    let payload = {
      email: loginDetails.email,
      password: loginDetails.password,
    };
    invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.LOGIN}`, payload).then(
      (response) => {
        if (response.message) {
          toast.error(response.message);
          setLoginDetails({
            ...loginDetails,
            errorMsg: response.message,
          });
        } else {
          response.user && setOfflineData('user', response.user);
          response.tokens && setOfflineData('tokens', response.tokens);
          navigate('/');
        }
      }
    );
  };

  return (
    <div className='login-container'>
      <div className='left'>
        {/* <img src={require('../../resources/info.png')} /> */}
      </div>
      <div className='right'>
        <div className='login-form'>
          <div className='title'>Login</div>
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
          <Button
            variant='contained'
            color='primary'
            onClick={login}
            disabled={!loginDetails.email || !loginDetails.password}
          >
            Login
          </Button>
          {/* <Button
            variant='text'
            color='primary'
            onClick={() => {
              navigate('/register');
            }}
          >
            Register
          </Button> */}
          {loginDetails.errorMsg && (
            <span className='error-msg'>{loginDetails.errorMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
