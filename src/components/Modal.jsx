import React, { useState, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "./AuthProvider";
import { registerUser } from "../services/api";
import isEmail from "validator/lib/isEmail";
import { isValidNumber } from "libphonenumber-js";

const avatars = [
  "https://www.shareicon.net/data/128x128/2016/05/24/770107_man_512x512.png",
  "https://www.shareicon.net/data/128x128/2016/05/24/770091_people_512x512.png",
  "https://www.shareicon.net/data/128x128/2016/05/24/770088_people_512x512.png",
  "https://www.shareicon.net/data/128x128/2016/05/24/770101_man_512x512.png",
  "https://www.shareicon.net/data/128x128/2016/05/24/770108_people_512x512.png",
  "https://www.shareicon.net/data/128x128/2016/05/24/770097_people_512x512.png",
];

const Modal = ({ showModal, setShowModal }) => {
  const { regularLogin, googleLogin } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const validateEmail = (email) => isEmail(email);

  const validatePhoneNumber = (phoneNumber) => isValidNumber(phoneNumber, "GB");

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]{2,16}$/;
    return nameRegex.test(name);
  };

  const validateNickname = (nickname) => {
    const nicknameRegex = /^[A-Za-z0-9_!@#$%^&*]{2,16}$/;
    return nicknameRegex.test(nickname);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignup) {
      if (!validateName(firstName)) {
        alert("First name should be between 2 to 16 letters only.");
        return;
      }
      if (!validateName(lastName)) {
        alert("Last name should be between 2 to 16 letters only.");
        return;
      }
      if (!validateNickname(nickname)) {
        alert("Nickname should be between 2 to 16 characters.");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        alert("Please enter a valid UK number.");
        return;
      }
      if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      try {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          nickname,
          email,
          password,
          mobile_phone: phoneNumber,
          avatar: selectedAvatar,
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
      const success = await googleLogin({ tokenId: response.credential });
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
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                          Choose an Avatar
                        </label>
                        <div className="flex space-x-4">
                          {avatars.map((avatar) => (
                            <img
                              key={avatar}
                              src={avatar}
                              alt="avatar"
                              className={`w-12 h-12 cursor-pointer rounded-full ${
                                selectedAvatar === avatar
                                  ? "border-4 border-blue-500"
                                  : ""
                              }`}
                              onClick={() => setSelectedAvatar(avatar)}
                            />
                          ))}
                        </div>
                      </div>

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
                          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                            !validateName(firstName) && firstName
                              ? "border-red-500"
                              : ""
                          }`}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {!validateName(firstName) && firstName && (
                          <p className="text-red-500 text-xs italic">
                            First name should be between 2 to 16 letters only..
                          </p>
                        )}
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
                          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                            !validateName(lastName) && lastName
                              ? "border-red-500"
                              : ""
                          }`}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {!validateName(lastName) && lastName && (
                          <p className="text-red-500 text-xs italic">
                            Last name should be between 2 to 16 letters only.
                          </p>
                        )}
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
                          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                            !validateNickname(nickname) && nickname
                              ? "border-red-500"
                              : ""
                          }`}
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                        {!validateNickname(nickname) && nickname && (
                          <p className="text-red-500 text-xs italic">
                            Nickname should be between 2 to 16 characters.
                          </p>
                        )}
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
                      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        !validateEmail(email) && email ? "border-red-500" : ""
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!validateEmail(email) && email && (
                      <p className="text-red-500 text-xs italic">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>

                  {isSignup && (
                    <>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="phone"
                        >
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="Enter your UK or TR mobile number"
                          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                            !validatePhoneNumber(phoneNumber) && phoneNumber
                              ? "border-red-500"
                              : ""
                          }`}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {!validatePhoneNumber(phoneNumber) && phoneNumber && (
                          <p className="text-red-500 text-xs italic">
                            Please enter a valid UK or TR number.
                          </p>
                        )}
                      </div>
                    </>
                  )}

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
                      className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                        !validatePassword(password) && password
                          ? "border-red-500"
                          : ""
                      }`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {!validatePassword(password) && password && (
                      <p className="text-red-500 text-xs italic">
                        Password must be at least 6 characters long.
                      </p>
                    )}
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                      {isSignup ? "Sign Up" : "Login"}
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup
                    ? "Already have an account? Login here."
                    : "Don't have an account? Sign up here."}
                </button>
              </div>
              {!isSignup && (
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-slate-200">
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                      alert("Google login failed. Please try again.");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
