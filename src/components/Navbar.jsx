import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold">Jewellery Store</div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="./Home" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="./EarRings" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Ear Rings</a>
              <a href="./Rings" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Rings</a>
              <a href="./Necklaces" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Necklaces</a>
              <a href="./Bracelets" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Bracelets</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
