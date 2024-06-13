import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ul className="text-gray-700 text-sm list-none flex space-x-4 justify-center">
          <li>
            <Link
              to="https://github.com/semih-suran/"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="https://wa.me/+447766112591"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/08/Wile-E-Coyote-Movie.jpg"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delivery & Returns
            </Link>
          </li>
          <li>
            <Link
              to="https://fiveminutemarketing.com/wp-content/uploads/2013/11/Top-Secret2.jpg"
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
  );
};

export default Footer;
