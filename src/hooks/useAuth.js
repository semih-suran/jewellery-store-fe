import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, googleLoginUser } from "../services/api";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser({
            user_id: decodedUser.userId,
            name: decodedUser.name,
            email: decodedUser.email,
            nickname: decodedUser.nickname,
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

  const regularLogin = useCallback(async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);
        setUser({
          user_id: decodedUser.userId,
          name: decodedUser.name,
          email: decodedUser.email,
          nickname: decodedUser.nickname,
          picture: decodedUser.picture,
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
  }, []);

  const googleLogin = useCallback(async (tokenId) => {
    try {
      const response = await googleLoginUser({ tokenId });
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);
        setUser({
          user_id: decodedUser.userId,
          name: decodedUser.name,
          email: decodedUser.email,
          nickname: decodedUser.nickname,
          picture: decodedUser.picture,
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
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return {
    user,
    regularLogin,
    googleLogin,
    logout,
  };
};

export default useAuth;
