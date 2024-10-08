import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { AuthContext } from "./AuthProvider.jsx";
import { FavouritesContext } from "../contexts/FavouritesContext.jsx";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext.jsx";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaWindowClose,
  FaUser,
} from "react-icons/fa";
import Modal from "./Modal";
import UnderDevelopment from "./UnderDevelopment.jsx";

const Search = lazy(() =>
  import("./Search").then((module) => ({ default: module.Search }))
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);
  const { bagItems } = useContext(ShoppingBagContext);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const renderMenuItems = (className) => (
    <div className={className}>
      <Link
        to="/all-products"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        onClick={closeMenu}
      >
        All Products
      </Link>
      <Link
        to="/earrings"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        onClick={closeMenu}
      >
        Earrings
      </Link>
      <Link
        to="/rings"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        onClick={closeMenu}
      >
        Rings
      </Link>
      <Link
        to="/necklaces"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        onClick={closeMenu}
      >
        Necklaces
      </Link>
      <Link
        to="/bracelets"
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        onClick={closeMenu}
      >
        Bracelets
      </Link>
    </div>
  );

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src="/media/JewelleryStoreThin-White.jpg"
                    alt="Jewellery Store Logo"
                    className="w-52"
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/favourites"
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <FaHeart className="w-6 h-6" />
                {favourites.length > 0 && (
                  <span className="absolute top-3 right-0 inline-flex items-center justify-center px-0.5 py-0 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {favourites.length}
                  </span>
                )}
              </Link>
              <Link
                to="/shopping-bag"
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <FaShoppingCart className="w-6 h-6" />
                {bagItems.length > 0 && (
                  <span className="absolute top-3 right-0 inline-flex items-center justify-center px-0.5 py-0 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {bagItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="cursor-pointer flex items-center space-x-2"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={user.picture}
                      alt={`${user.nickname}'s avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-1">
                      <Link
                        to={`/my-account/${user.user_id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          toggleDropdown();
                        }}
                      >
                        My Account
                      </Link>
                      <Link
                        onClick={() => {
                          handleLogout();
                          toggleDropdown();
                        }}
                        to={"/"}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="text-gray-700 hover:text-gray-900 relative"
                  onClick={() => setShowModal(true)}
                >
                  <FaUser className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2" ref={menuRef}>
            <div className="flex flex-col items-start">
              {windowWidth > 600 ? (
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
            <div className="flex-grow flex justify-end">
              <button className="px-4 py-2 rounded-full" onClick={toggleSearch}>
                {searchOpen ? (
                  <FaWindowClose className="text-gray-700" />
                ) : (
                  <FaSearch className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {searchOpen && (
            <Suspense fallback={<div>Loading...</div>}>
              <div className="mt-4">
                <Search onSearchClose={closeSearch} />
              </div>
            </Suspense>
          )}
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </nav>
      <UnderDevelopment
        show={showAlert}
        onClose={() => setShowAlert(false)}
        message="This section is currently under development. Please check back later."
      />
    </>
  );
};

export default Navbar;
