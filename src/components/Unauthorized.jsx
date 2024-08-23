import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-4">You are not authorized to view this page.</p>
      <Link to="/" className="text-white hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default Unauthorized;
