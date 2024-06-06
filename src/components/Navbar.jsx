import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AuthContext } from "./AuthProvider.jsx";

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const logoutResponse = await googleLogout();
    if (!logoutResponse) {
      logout();
    } else {
      console.error("Logout failed");
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold ml-4">
              <Link to="/">Jewellery Store</Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center">
                <span className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {user.name}
                </span>
                <img
                  src={user.picture}
                  alt="user avatar"
                  className="w-12 h-12 rounded-full overflow-hidden mr-2"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={login}
                onError={() => console.log("Login Failed")}
              />
            )}
          </div>
          <div>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 md:block">
          <Link
            to="/earrings"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Earrings
          </Link>
          <Link
            to="/rings"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Rings
          </Link>
          <Link
            to="/necklaces"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Necklaces
          </Link>
          <Link
            to="/bracelets"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Bracelets
          </Link>
          <Link
            to="/favourites"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Favourites
          </Link>
          <Link
            to="/shopping-bag"
            className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            Shopping Bag
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
