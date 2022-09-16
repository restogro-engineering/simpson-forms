/** @format */

import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import {
  getOfflineData,
  setOfflineData,
  clearOfflineData,
} from './offline-services';
import { toast } from 'react-toastify';
import { HOSTNAME, REST_URLS } from './endpoints';

export const HTTP_METHODS = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};

const getToken = async () => {
  let tokens = getOfflineData('tokens');
  if (tokens === '') {
    return;
  }
  let expiredAt =
    (tokens && tokens.access && new Date(tokens.access.expires)) ||
    new Date(1970);
  if (expiredAt > new Date()) {
    return (tokens && tokens.access && tokens.access.token) || '';
  } else if (tokens && tokens.refresh && tokens.refresh.token) {
    return await getRefreshToken(tokens.refresh.token);
  }
};

const getRefreshToken = async (refreshToken) => {
  try {
    const response = await trackPromise(
      fetch(`${HOSTNAME}${REST_URLS.REFRESH_TOKEN}`, {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    const tokens = await response.json();
    if (tokens.code === 401 || tokens.code) {
      toast.error('Token expired');
      localStorage.clear();
    } else {
      setOfflineData('tokens', tokens);
    }
    return tokens.access.token || '';
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
};

export const invokeApi = async (method, url, data, params) => {
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getToken()}`,
  };

  if (params) {
    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    url = url + '?' + query;
  }

  return trackPromise(
    fetch(url, {
      method: method,
      body: (data && JSON.stringify(data)) || undefined,
      headers: headers,
      params: params,
    }).then((response) => {
      if (response.status === 401 && url !== `${HOSTNAME}${REST_URLS.LOGIN}`) {
        toast.error('Token expired');
        clearOfflineData('user');
        window.location = window.location.origin + '/login';
      }

      if (response.status === 204) {
        return Promise.resolve('ok');
      }
      return response.json();
    })
  );
};

export const progressiveInvokeApi = async (method, url, data, params) => {
  let headers = {
    Authorization: `Bearer ${await getToken()}`,
  };

  return axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
    params: params,
  }).then((response) => {
    return response;
  });
};

export const invokeUploadFile = async (url, formData) => {
  const config = {
    timeout: 100000 * 3,
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${await getToken()}`,
    },
  };
  return axios.post(url, formData, config);
};
