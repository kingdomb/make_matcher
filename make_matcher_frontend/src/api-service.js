import axios from 'axios';

const apiBaseUrl = 'https://make-matcher-backend.fly.dev/api';

function generateToken() {
  const key = process.env.REACT_APP_API_KEY;
  const secret = process.env.REACT_APP_API_SECRET;
  return `${key}::${secret}::${Date.now()}`;
}

function getHeaders() {
  const token = generateToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function apiGet(path, params = {}) {
  // console.log('GET request to:', apiBaseUrl);
  // console.log('params:', params);
  // console.log('headers:', getHeaders());
  return axios
    .get(`${apiBaseUrl}/${path}`, {
      headers: getHeaders(),
      params,
    })
    .catch(handleAxiosError);
}

export function apiPost(path, data = {}) {
  // console.log('POST request to:', apiBaseUrl);
  // console.log('data:', data);
  // console.log('headers:', getHeaders());

  return axios
    .post(`${apiBaseUrl}/${path}`, data, {
      headers: getHeaders(),
    })
    .catch(handleAxiosError);
}

function handleAxiosError(error) {
  if (axios.isAxiosError(error)) {
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data.message || error.message,
    });
  }

  return Promise.reject(error);
}
