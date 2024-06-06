import React, { useContext } from "react";
import { handleItemButtonClick } from "../services/api";
import { ShoppingBagContext } from "./ShoppingBagContext";

const Item = ({ title, imageUrl, price }) => {
  const { addToBag } = useContext(ShoppingBagContext);
  return (
    <div className="min-w-[200px] sm:min-w-[150px] md:min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0">
      {/* Link eklenecek, resme tiklandiginda o urune gidecek */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
        onClick={handleItemButtonClick}
      />
      {/* Link eklenecek, resme tiklandiginda o urune gidecek */}
      <div className="mt-2 text-center">
        {title}
        <div className="flex items-center justify-between mt-2">
          <div>{price}</div>
          <button
            onClick={() => addToBag({ title, imageUrl, price })}
            className="text-xs bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
