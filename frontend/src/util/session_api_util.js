import axios from 'axios';

export const signup = (userData) => {
    debugger
    return axios.post('/api/users/register', userData);
}

export const login = (userData) => {
    return axios.post('/api/users/login', userData)
}

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};