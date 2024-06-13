import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "./FavouritesContext";
import { ShoppingBagContext } from "./ShoppingBagContext";
import { motion, AnimatePresence } from "framer-motion";

function Favourites() {
  const { favourites, removeFromFavourites } = useContext(FavouritesContext);
  const { addToBag } = useContext(ShoppingBagContext);
  const [isAdded, setIsAdded] = useState({});

  const handleAddToBag = async (item) => {
    setIsAdded((prev) => ({ ...prev, [item.title]: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addToBag(item);
    removeFromFavourites(item);
    setIsAdded((prev) => ({ ...prev, [item.title]: false }));
  };

  const handleRemoveFromFavourites = (item) => {
    setIsAdded((prev) => ({ ...prev, [item.title]: "removing" }));
    setTimeout(() => {
      removeFromFavourites(item);
    }, 500); // Match this duration with the animation duration
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-800">Favourites</h1>
        {favourites.length === 0 ? (
          <p>No favourite items yet...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <AnimatePresence>
              {favourites.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isAdded[item.title] === "removing" ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-center">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p>{item.price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <motion.button
                        onClick={() => handleAddToBag(item)}
                        className={`text-xs py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                          ${isAdded[item.title] ? 'bg-green-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-700'}`}
                        animate={{ scale: isAdded[item.title] && isAdded[item.title] !== "removing" ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {isAdded[item.title] && isAdded[item.title] !== "removing" ? "Added!" : "Add to Bag"}
                      </motion.button>
                      <motion.button
                        onClick={() => handleRemoveFromFavourites(item)}
                        className="text-xs py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-red-500 text-white hover:bg-red-700"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        Remove from Favourites
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        <Link
          to="/"
          className="mt-4 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Favourites;
