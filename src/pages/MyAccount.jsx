import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import {
  fetchUserById,
  updateUserAddress,
  updateUserNickname,
} from "../services/api";
import Footer from "../components/Footer";
import UnderDevelopment from "../components/UnderDevelopment";

function MyAccount() {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Profile");

  const [showAlert, setShowAlert] = useState(false);

  const underDevelopment = () => {
    setShowAlert(true);
  };

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
        zipCode: user.zipcode,
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
            </div>
            <label className="block mb-2">Last Name:</label>
            <div className="relative">
              <input
                type="text"
                value={user.last_name || ""}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
              />
            </div>
            <label className="block mb-2">Nickname:</label>
            <div className="relative">
              <input
                type="text"
                value={user.nickname || ""}
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-black"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSaveNickname}
                className="flex items-center gap-2 px-4 py-2 border border-black rounded-md bg-white hover:bg-gray-100"
              >
                <FaRegSave />
                Save
              </button>
            </div>
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
            </div>
            <label className="block mb-2">Mobile Phone:</label>
            <div className="relative">
              <input
                type="text"
                value={user.mobile_phone || ""}
                disabled
                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-black rounded-md bg-white hover:bg-gray-100">
                <FaRegSave />
                Save
              </button>
            </div>
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
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-black"
              />
            </div>
            <label className="block mb-2">City:</label>
            <div className="relative">
              <input
                type="text"
                value={user.city || ""}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-black"
              />
            </div>
            <label className="block mb-2">State:</label>
            <div className="relative">
              <input
                type="text"
                value={user.state || ""}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-black"
              />
            </div>
            <label className="block mb-2">Zip Code:</label>
            <div className="relative">
              <input
                type="text"
                value={user.zipcode || ""}
                onChange={(e) => setUser({ ...user, zipcode: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-black"
              />
            </div>
            <label className="block mb-2">Country:</label>
            <div className="relative">
              <input
                type="text"
                value={user.country || ""}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md hover:border-black"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSaveAddress}
                className="flex items-center gap-2 px-4 py-2 border border-black rounded-md bg-white hover:bg-gray-100"
              >
                <FaRegSave />
                Save
              </button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to edit user information.</div>;
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
        <div className="flex flex-col sm:flex-row w-full h-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="sm:w-1/4 w-full bg-gray-700 p-6 flex flex-col items-center text-white sm:min-w-[250px] sm:max-w-[250px]">
            <img
              src={user.picture}
              alt="User Profile"
              className="w-24 h-24 mb-4 rounded-full border-4 border-white"
            />
            <h1 className="text-xl font-semibold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm">{user.nickname}</p>
            <p className="text-sm">
              Member Since:{" "}
              {new Date(user.created_at).toISOString().slice(0, 10)}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-6 w-full">
              <button
                onClick={() => setActiveTab("Profile")}
                className="bg-gray-600 text-white py-2 px-4 rounded border border-transparent hover:border-white"
              >
                Profile
              </button>
              <Link
                to="/"
                className="bg-gray-600 text-white py-2 px-4 rounded border border-transparent hover:border-white text-center"
              >
                Home
              </Link>
              <button
                onClick={() => setActiveTab("Contact")}
                className="bg-gray-600 text-white py-2 px-4 rounded border border-transparent hover:border-white"
              >
                Contact
              </button>
              <button
                onClick={underDevelopment}
                className="bg-gray-600 text-white py-2 px-4 rounded border border-transparent hover:border-white flex items-center justify-center gap-1"
              >
                Orders <MdDone />
              </button>
              <button
                onClick={() => setActiveTab("Address")}
                className="bg-gray-600 text-white py-2 px-4 rounded border border-transparent hover:border-white"
              >
                Address
              </button>
              <button
                onClick={underDevelopment}
                className="bg-gray-600 text-white py-2 px-4 rounded border border-transparent hover:border-white flex items-center justify-center gap-1"
              >
                Orders <GiSandsOfTime />
              </button>
            </div>

            <p className="text-sm">
              Last Updated:{" "}
              {new Date(user.updated_at).toISOString().slice(0, 10)}
            </p>
          </div>
          <div className="w-full p-6">{renderContent()}</div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <UnderDevelopment
        show={showAlert}
        onClose={() => setShowAlert(false)}
        message="This section is currently under development. Please check back later."
      />
    </>
  );
}

export default MyAccount;
