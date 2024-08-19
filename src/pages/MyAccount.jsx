import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import {
  fetchUserById,
  updateUserAddress,
  updateUserNickname,
} from "../services/api";

function MyAccount() {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserById(user_id);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [user_id]);

  if (!user) return <div>Loading...</div>;

  const handleSaveNickname = async () => {
    try {
      const nicknameData = { nickname: user.nickname };
      await updateUserNickname(user.user_id, nicknameData);
      alert("Nickname updated successfully!");
    } catch (error) {
      console.error("Failed to update nickname:", error);
      alert("Failed to update nickname.");
    }
  };

  const handleSaveAddress = async () => {
    try {
      const updatedAddress = {
        street: user.street,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        country: user.country,
      };
      await updateUserAddress(user.user_id, updatedAddress);
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Failed to update address.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <label className="block mb-2">First Name:</label>
            <div className="relative">
              <input
                type="text"
                value={user.first_name || ""}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
              />
              <FaEdit className="absolute right-2 top-3 text-gray-400" />
            </div>
            <label className="block mb-2">Last Name:</label>
            <div className="relative">
              <input
                type="text"
                value={user.last_name || ""}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
              />
              <FaEdit className="absolute right-2 top-3 text-gray-400" />
            </div>
            <label className="block mb-2">Nickname:</label>
            <div className="relative">
              <input
                type="text"
                value={user.nickname || ""}
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-blue-400"
              />
              <FaEdit className="absolute right-2 top-3 text-blue-500 hover:text-blue-700" />
            </div>
            <button onClick={handleSaveNickname} className="btn-save">
              Save Profile
            </button>
          </div>
        );
      case "Contact":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <label className="block mb-2">Email:</label>
            <div className="relative">
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
              />
              <FaEdit className="absolute right-2 top-3 text-gray-400" />
            </div>
            <label className="block mb-2">Mobile Phone:</label>
            <div className="relative">
              <input
                type="text"
                value={user.mobile_phone || ""}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
              />
              <FaEdit className="absolute right-2 top-3 text-gray-400" />
            </div>
            <button className="btn-save">Save Contact</button>
          </div>
        );
      case "Address":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Edit Address</h2>
            <label className="block mb-2">Street:</label>
            <div className="relative">
              <input
                type="text"
                value={user.street || ""}
                onChange={(e) => setUser({ ...user, street: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-blue-400"
              />
              <FaEdit className="absolute right-2 top-3 text-blue-500 hover:text-blue-700" />
            </div>
            <label className="block mb-2">City:</label>
            <div className="relative">
              <input
                type="text"
                value={user.city || ""}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-blue-400"
              />
              <FaEdit className="absolute right-2 top-3 text-blue-500 hover:text-blue-700" />
            </div>
            <label className="block mb-2">State:</label>
            <div className="relative">
              <input
                type="text"
                value={user.state || ""}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-blue-400"
              />
              <FaEdit className="absolute right-2 top-3 text-blue-500 hover:text-blue-700" />
            </div>
            <label className="block mb-2">Zip Code:</label>
            <div className="relative">
              <input
                type="text"
                value={user.zipcode || ""}
                onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-blue-400"
              />
              <FaEdit className="absolute right-2 top-3 text-blue-500 hover:text-blue-700" />
            </div>
            <label className="block mb-2">Country:</label>
            <div className="relative">
              <input
                type="text"
                value={user.country || ""}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-blue-400"
              />
              <FaEdit className="absolute right-2 top-3 text-blue-500 hover:text-blue-700" />
            </div>
            <button onClick={handleSaveAddress} className="btn-save">
              Save Address
            </button>
          </div>
        );
      default:
        return <div>Select a tab to edit user information.</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
      <div className="flex flex-row w-full h-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/4 bg-blue-500 p-6 flex flex-col items-center text-white">
          <img
            src={user.picture}
            alt="User Profile"
            className="w-24 h-24 mb-4 rounded-full border-4 border-white"
          />
          <h1 className="text-xl font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-sm">{user.email}</p>
          <p className="text-sm mb-4">{user.nickname}</p>
          <div className="flex flex-col space-y-2 mt-6">
            <button
              onClick={() => setActiveTab("Profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("Contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab("Address")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Address
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
              My Orders
            </button>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-center"
            >
              Home Page
            </Link>
          </div>
        </div>
        <div className="w-3/4 p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default MyAccount;
