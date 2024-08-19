import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaCcPaypal,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { calculateTotalPrice, formatPrice } from "../utils/priceUtils";
import Footer from "../components/Footer";

function ShoppingBag() {
  const { bagItems, removeFromBag, updateQuantity } =
    useContext(ShoppingBagContext);
  const [isRemoving, setIsRemoving] = useState({});
  const navigate = useNavigate();

  const totalPrice = calculateTotalPrice(bagItems);

  const handleRemoveFromBag = (item) => {
    setIsRemoving((prev) => ({ ...prev, [item.the_item_id]: true }));

    setTimeout(() => {
      removeFromBag(item.the_item_id);
    }, 500);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { totalPrice } });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
        <div className="flex flex-col items-center justify-center h-full w-11/12 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Bag</h1>
          {bagItems.length === 0 ? (
            <p>Your shopping bag is empty.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-4 w-full">
              <AnimatePresence>
                {bagItems.map((item) => (
                  <motion.div
                    key={item.item_id}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: isRemoving[item.the_item_id] ? 0 : 1,
                      scale: isRemoving[item.the_item_id] ? 0.95 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex flex-col items-center justify-between p-4 bg-white shadow-md rounded-lg max-w-600px"
                    onClick={() => navigate(`/product/${item.item_id}`)}
                  >
                    <div className="flex items-center w-full">
                      <img
                        src={item.images_url[0]}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg mr-4 cursor-pointer"
                      />
                      <div className="flex flex-col md:flex-row items-center justify-between w-full">
                        <div className="flex items-center">
                          <h2 className="font-bold mr-2">{item.name}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromBag(item);
                          }}
                          className="w-6 h-6 text-gray-500 mr-1"
                        >
                          <FaTrash className="w-4 h-4 text-gray-500 hover:text-black" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.item_id, item.quantity - 1);
                          }}
                          className="text-xs bg-gray-200 text-gray-700 py-1 px-1 rounded-md hover:bg-gray-400 focus:outline-none"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="mx-1">{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.item_id, item.quantity + 1);
                          }}
                          className="text-xs bg-gray-200 text-gray-700 py-1 px-1 rounded-md hover:bg-gray-400 focus:outline-none"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-semibold text-gray-700">
                        Total Price: £
                        {(formatPrice(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex justify-between w-full mt-8">
                <Link
                  to="/"
                  className="flex flex-col items-center text-gray-700 hover:text-black focus:outline-none border border-black rounded-lg p-4"
                >
                  <FaShoppingCart className="w-6 h-6 mb-2" />
                  Continue Shopping
                </Link>
                {bagItems.length > 0 && (
                  <button
                    onClick={handleCheckout}
                    className="flex flex-col items-center text-gray-700 hover:text-black focus:outline-none border border-black rounded-lg p-4"
                  >
                    <FaCcPaypal className="w-6 h-6 mb-2" />
                    {`Checkout £${totalPrice}`}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingBag;
