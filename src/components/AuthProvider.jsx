import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser({
        name: decodedUser.name,
        email: decodedUser.email,
        picture: decodedUser.picture,
      });
    }
  }, []);

  const login = (response) => {
    const token = response.credential;
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser({
      name: decodedUser.name,
      email: decodedUser.email,
      picture: decodedUser.picture,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
