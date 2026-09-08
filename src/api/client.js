import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420', // Bypasses ngrok's warning page for API requests
  },
});

function getTokens() {
  try {
    return JSON.parse(localStorage.getItem('tokens') || 'null');
  } catch {
    return null;
  }
}

function setTokens(tokens) {
  if (tokens) localStorage.setItem('tokens', JSON.stringify(tokens));
  else localStorage.removeItem('tokens');
}

api.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

// On a 401, try refreshing the access token once, then retry the request.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const tokens = getTokens();
      if (tokens?.refresh) {
        try {
          const { data } = await axios.post(`${API_URL}/token/refresh/`, { refresh: tokens.refresh });
          setTokens({ ...tokens, access: data.access });
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          setTokens(null);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { api, getTokens, setTokens, API_URL };