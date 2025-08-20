import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.get("/api/auth/me")
      .then(res => setUser(res.data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const login = async (payload) => {
    const res = await api.post("/api/auth/login", payload);
    setUser(res.data?.user || null);
    return res.data;
  };

  const register = async (payload) => {
    const res = await api.post("/api/auth/register", payload);
    setUser(res.data?.user || null);
    return res.data;
  };

  const logout = async () => {
   
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
