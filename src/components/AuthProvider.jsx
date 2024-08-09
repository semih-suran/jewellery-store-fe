import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
