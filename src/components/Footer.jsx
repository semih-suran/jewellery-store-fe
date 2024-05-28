import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} Jewellery Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
