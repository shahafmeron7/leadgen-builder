import {jwtDecode} from 'jwt-decode';
import { baseAuthURL } from '@/utils/data/url';

const getStoredToken = () => localStorage.getItem('token');
const getStoredRefreshToken = () => localStorage.getItem('refreshToken');

const storeTokens = (token, refreshToken) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};

const refreshToken = async () => {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await fetch(`${baseAuthURL}refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  storeTokens(data.token, refreshToken);
  return data.token;
};

const api = async (url, options = {}) => {
  let token = getStoredToken();

  if (isTokenExpired(token)) {
    try {
      token = await refreshToken();
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
      token = await refreshToken();
      headers['Authorization'] = `Bearer ${token}`;
      return fetch(url, { ...options, headers });
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  return response;
};

export default api;
