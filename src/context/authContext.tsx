import React, { createContext, useContext, useEffect, useState } from "react";

import type { AuthContextType } from "../types/useAuth";

const AuthContext = createContext<AuthContextType>({
  token: null,
  email: null,
  login: async () => { },
  logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("auth_token");
  });
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem("auth_email"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
    if (email) {
      localStorage.setItem("auth_email", email);
    } else {
      localStorage.removeItem("auth_email");
    }
  }, [token, email]);

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Invalid credentials");
    setToken("TOKEN-" + Math.random().toString(36).slice(2));
    setEmail(email);
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
