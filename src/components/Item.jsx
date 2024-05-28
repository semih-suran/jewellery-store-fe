import React from 'react';

const Item = ({ title, imageUrl, onClick }) => {
  return (
    <div className="min-w-[200px] sm:min-w-[150px] md:min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0 cursor-pointer" onClick={onClick}>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg" />
      <div className="mt-2 text-center">{title}</div>
    </div>
  );
};

export default Item;
