import React from "react";
import { Link } from "react-router-dom";

function MyAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
        <p>Functionality is under development...</p>
        <Link
          to="/"
          className="mt-4 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}

export default MyAccount;
