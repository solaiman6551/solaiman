import { createContext, useContext, useEffect, useState } from 'react';
import { api, getTokens, setTokens } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokens = getTokens();
    if (!tokens?.access) {
      setLoading(false);
      return;
    }
    api
      .get('/me/')
      .then((res) => setUser(res.data))
      .catch(() => setTokens(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    const { data } = await api.post('/token/', { username, password });
    setTokens({ access: data.access, refresh: data.refresh });
    const me = await api.get('/me/');
    setUser(me.data);
  }

  function logout() {
    setTokens(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}