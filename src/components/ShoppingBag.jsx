import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagContext } from "./ShoppingBagContext";
import {handleItemButtonClick} from "../services/api"

function ShoppingBag() {
  const { bagItems, removeFromBag, clearBag } = useContext(ShoppingBagContext);

  const totalPrice = bagItems
    .reduce((total, item) => {
      const priceNumber = parseFloat(item.price.replace("£", ""));
      return total + priceNumber;
    }, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Bag</h1>
        {bagItems.length === 0 ? (
          <p>Your shopping bag is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {bagItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromBag(index)}
                  className="text-xs bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                onClick={clearBag}
                className="w-80 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Clear Bag
              </button>
            </div>
          </div>
        )}
        <Link
          to="/"
          className="w-80 mt-4 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none flex items-center justify-center"
        >
          Continue Shopping
        </Link>
        {bagItems.length > 0 && (
          <Link
            to="/shopping-bag"
            className="w-80 mt-4 py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-700 focus:outline-none flex items-center justify-center"
            onClick={handleItemButtonClick}
          >
            {`Pay £${totalPrice}`}
          </Link>
        )}
      </div>
    </div>
  );
}

export default ShoppingBag;
