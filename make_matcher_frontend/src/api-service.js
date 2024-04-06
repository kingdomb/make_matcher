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
    'x-api-key': `Bearer ${token}`,
  };
}

export function apiGet(path, params = {}) {
  console.log(`GET request to: ${apiBaseUrl}/${path}`);
  console.log('params:', params);
  // console.log('headers:', getHeaders());
  return axios
    .get(`${apiBaseUrl}/${path}`, {
      headers: getHeaders(),
      params,
    })
    .catch(handleAxiosError);
}

export function apiPostAuth(path, data = {}) {
  console.log(`POST request to: ${apiBaseUrl}/${path}`);
  console.log('data:', data);
  // console.log('headers:', getHeaders());

  return axios
    .post(`${apiBaseUrl}/${path}`, data, {
      headers: getHeaders(),
    })
    .catch(handleAxiosError);
}

export function apiGetProfile(token) {
  console.log(`GET request to: ${apiBaseUrl}/profile`);
  return axios
    .get(`${apiBaseUrl}/profile`, {
      headers: {
        'x-api-key': generateToken(),
        Authorization: `Token ${token}`,
      },
    })
    .catch(handleAxiosError);
}

export function apiPostProfile(data, token) {
  console.log(`POST request to: ${apiBaseUrl}/profile`);
  // console.log('data:', data);
  return axios
    .post(`${apiBaseUrl}/profile`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': generateToken(),
        Authorization: `Token ${token}`,
      },
    })
    .catch(handleAxiosError);
}

/*-- Friend Requests --*/

export function apiGetFriendRequests(token) {
  console.log(`GET request to: ${apiBaseUrl}/friend_requests`);
  return axios
    .get(`${apiBaseUrl}/friend_requests`, {
      headers: {
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

export function apiCreateFriendRequest(data, token) {
  console.log(`POST request to: ${apiBaseUrl}/friend_requests`);
  return axios
    .post(`${apiBaseUrl}/friend_requests`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

export function apiDeleteFriendRequest(requestId, token) {
  console.log(`DELETE request to: ${apiBaseUrl}/friend_requests/${requestId}`);
  return axios
    .delete(`${apiBaseUrl}/friend_requests/${requestId}`, {
      headers: {
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

/*-- Friends --*/

export function apiGetFriends(token) {
  return axios
    .get(`${apiBaseUrl}/friends`, {
      headers: {
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

export function apiCreateFriend(data, token) {
  return axios
    .post(`${apiBaseUrl}/friends`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

export function apiDeleteFriend(friendId, token) {
  return axios
    .delete(`${apiBaseUrl}/friends/${friendId}`, {
      headers: {
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

/*-- Match --*/

export function apiGetMatches(token) {
  return axios
    .get(`https://make-matcher-backend.fly.dev/api/matches`, {
      headers: {
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

export function apiRejectMatch(matchId, token) {
  return axios
    .delete(`https://make-matcher-backend.fly.dev/api/matches/${matchId}`, {
      headers: {
        Authorization: `Token ${token}`,
        ...getHeaders(),
      },
    })
    .catch(handleAxiosError);
}

/*-- Group --*/

/*-- General --*/

function handleAxiosError(error) {
  if (axios.isAxiosError(error)) {
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data.message || error.message,
    });
  }

  return Promise.reject(error);
}

export function getErrorMessage(error) {
  console.log('*** error: ', error);
  let statusCode = String(error.response?.status);
  let errorMessage = 'An error occurred';

  // if error is an Axios error
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message;
    // if  message is array
    if (Array.isArray(message)) {
      errorMessage = `${message.join(', ')}`;
    }
    // if message is string
    else if (typeof message === 'string') {
      errorMessage = `${message}`;
    }
    // anything else
    else {
      errorMessage = `${error.message}`;
    }
  }
  // direct error objects handling
  else if (error && error.status) {
    if (typeof error.message === 'string') {
      statusCode = error.status;
      errorMessage = `${error.message}`;
    } else if (Array.isArray(error.message) && error.message.length) {
      statusCode = error.status;
      errorMessage = `${error.message.join(', ')}`;
    }
  }
  // if standard js error objects
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return { statusCode, errorMessage };
}
