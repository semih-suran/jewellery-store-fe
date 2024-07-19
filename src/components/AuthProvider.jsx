import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser({
            name: decodedUser.name,
            email: decodedUser.email,
            picture: decodedUser.picture,
          });
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (response) => {
    try {
      const token = response.credential;
      if (token.split(".").length !== 3) {
        throw new Error("Invalid token format");
      }
      localStorage.setItem("token", token);
      const decodedUser = jwtDecode(token);
      setUser({
        name: decodedUser.name,
        email: decodedUser.email,
        picture: decodedUser.picture,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
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
