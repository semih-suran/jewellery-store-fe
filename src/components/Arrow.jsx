import React from "react";

const Arrow = ({ direction, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 p-2 pt-7 pb-7 bg-gray-800 text-white rounded-full cursor-pointer ${
        direction === "left" ? "left-2" : "right-2"
      } flex items-center`}
    >
      {direction === "left" ? "<" : ">"}
    </div>
  );
};

export default Arrow;
