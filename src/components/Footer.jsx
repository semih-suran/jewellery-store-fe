import React, { useState } from "react";
import { Link } from "react-router-dom";
import UnderDevelopment from "./UnderDevelopment";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const underDevelopment = () => {
    setShowModal(true);
  };

  return (
    <>
      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ul className="text-gray-700 text-sm list-none flex space-x-4 justify-center">
            <li>
              <Link
                to="https://github.com/semih-suran/"
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="https://wa.me/+447766112591"
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={underDevelopment}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Delivery & Returns
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={underDevelopment}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <div className="text-center text-gray-700 text-sm mt-4">
            &copy; {new Date().getFullYear()} Jewellery Store. All rights
            reserved.
          </div>
        </div>
      </footer>


      <UnderDevelopment
        show={showModal}
        onClose={() => setShowModal(false)}
        message="This section is currently under development. Please check back later."
      />
    </>
  );
};

export default Footer;
