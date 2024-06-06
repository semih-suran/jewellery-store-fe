import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AuthContext } from "./AuthProvider.jsx";

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const renderMenuItems = (className) => (
    <div className={className}>
      <Link
        to="/earrings"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Earrings
      </Link>
      <Link
        to="/rings"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Rings
      </Link>
      <Link
        to="/necklaces"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Necklaces
      </Link>
      <Link
        to="/bracelets"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Bracelets
      </Link>
      <Link
        to="/favourites"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Favourites
      </Link>
      <Link
        to="/shopping-bag"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Shopping Bag
      </Link>
    </div>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
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
          </div>
          <div className="flex flex-col items-start justify-start">
            {windowWidth > 680 ? (
              renderMenuItems("flex ml-4 space-x-4")
            ) : (
              <>
                {!isOpen && (
                  <button
                    onClick={toggleMenu}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Menu
                  </button>
                )}
                {isOpen && windowWidth < 680 && (
                  <>
                    <button
                      onClick={toggleMenu}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Menu
                    </button>
                    <div className="flex flex-col space-y-1 ml-4">
                      {renderMenuItems("flex flex-col")}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
