import React from "react";

const Bracelets = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Bracelets</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Sample items */}
        <div className="min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0">
          Item 1
        </div>
        <div className="min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0">
          Item 2
        </div>
        <div className="min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0">
          Item 3
        </div>
        <div className="min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0">
          Item 4
        </div>
      </div>
    </div>
  );
};

export default Bracelets;
