import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagContext } from "./ShoppingBagContext";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

function ShoppingBag() {
  const { bagItems, removeFromBag, clearBag, updateQuantity } = useContext(ShoppingBagContext);
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return bagItems
      .reduce((total, item) => {
        const priceNumber = parseFloat(item.price.replace("£", ""));
        return total + priceNumber * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
      <div className="flex flex-col items-center justify-center h-full w-11/12 mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Bag</h1>
        {bagItems.length === 0 ? (
          <p>Your shopping bag is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 mt-4 w-full">
            {bagItems.map((item) => (
              <div
                key={item.item_id}
                className="relative flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg transform transition-transform duration-200 hover:scale-105 max-w-600px"
                onClick={() => navigate(`/product/${item.item_id}`)}
              >
                <div className="flex flex-col w-full md:w-auto">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <h2 className="text-xl font-bold mr-2">{item.name}</h2>
                      <p className="text-lg font-semibold text-gray-700">£{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src={item.images_url[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                    <div className="flex items-center ml-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromBag(item.item_id);
                        }}
                        className="w-6 h-6 text-gray-500 mr-2"
                      >
                        <FaTrash className="w-5 h-5 text-gray-500 hover:text-black" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.item_id, item.quantity - 1);
                        }}
                        className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-400 focus:outline-none"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.item_id, item.quantity + 1);
                        }}
                        className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-md hover:bg-gray-400 focus:outline-none"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end items-center mt-2">
                    <p className="ml-auto text-lg font-semibold text-gray-700">
                      Total Price: £{(parseFloat(item.price.replace("£", "")) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
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
          to="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Under Development!");
          }}
            className="w-80 mt-4 py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-700 focus:outline-none flex items-center justify-center"
          >
            {`Pay £${totalPrice}`}
          </Link>
        )}
      </div>
    </div>
  );
}

export default ShoppingBag;
