import React, { useState, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "./AuthProvider";
import { registerUser } from "../services/api";

const Modal = ({ showModal, setShowModal }) => {
  const { regularLogin, googleLogin } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignup) {
      try {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          nickname,
          email,
          password,
        };
        await registerUser(userData);
        alert("Registration successful! Please log in.");
        setIsSignup(false);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data.message
            : "Registration failed. Please try again.";
        console.error("Error registering user:", errorMessage);
        alert(errorMessage);
      }
    } else {
      const success = await regularLogin(email, password);
      if (success) {
        setShowModal(false);
      }
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const success = await googleLogin(response.credential);
      if (success) {
        setShowModal(false);
      } else {
        alert("Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6 z-50">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-3xl font-semibold">
                  {isSignup ? "Sign Up" : "Login"}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <form onSubmit={handleSubmit}>
                  {isSignup && (
                    <>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="first_name"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          placeholder="Enter your first name"
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="last_name"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          placeholder="Enter your last name"
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="nickname"
                        >
                          Nickname
                        </label>
                        <input
                          type="text"
                          id="nickname"
                          placeholder="Enter your nickname"
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    {isSignup ? "Sign Up" : "Login"}
                  </button>
                </form>
                <div className="my-4 text-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.log("Google login failed")}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup
                    ? "Already have an account? Login"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
