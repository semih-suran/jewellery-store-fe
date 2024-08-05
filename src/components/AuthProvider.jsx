import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, googleLoginUser } from "../services/api";

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
            nickname: decodedUser.nickname,
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

  const regularLogin = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      console.log("Backend response:", response);

      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);
        setUser({
          name: decodedUser.name,
          email: decodedUser.email,
          picture: decodedUser.picture || null,
          nickname: decodedUser.nickname,
        });
        return true;
      } else {
        throw new Error("No token received from backend");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message ||
            "Login failed. Please check your credentials and try again.";
      console.error("Login failed:", errorMessage);
      alert(errorMessage);
      return false;
    }
  };

  const googleLogin = async (tokenId) => {
    try {
      const response = await googleLoginUser({ tokenId });
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);        
        setUser({
          name: decodedUser.name,
          email: decodedUser.email,
          picture: decodedUser.picture || null,
          nickname: decodedUser.nickname,
        });
        return true;
      } else {
        throw new Error("No token received from backend");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message || "Google login failed. Please try again.";
      console.error("Google login failed:", errorMessage);
      alert(errorMessage);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, regularLogin, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
