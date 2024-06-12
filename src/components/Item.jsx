import React, { useContext, useState, useEffect } from "react";
import { handleItemButtonClick } from "../services/api";
import { ShoppingBagContext } from "./ShoppingBagContext";
import { FavouritesContext } from "./FavouritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const Item = ({ title, imageUrl, price }) => {
  const { addToBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const [isAdded, setIsAdded] = useState(false);
  const isFavourite = favourites.some((item) => item.title === title);
  const controls = useAnimation();
  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites({ title, imageUrl, price });
    } else {
      addToFavourites({ title, imageUrl, price });
    }
  };
  const handleAddToBag = () => {
    addToBag({ title, imageUrl, price });
    setIsAdded(true);
    controls.start({ scale: 1.2, transition: { duration: 0.1 } }).then(() => {
      controls.start({ scale: 1, transition: { duration: 0.1 } });
    });
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setIsAdded(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  return (
    <div className="min-w-[330px] sm:min-w-[150px] md:min-w-[200px] bg-gray-200 p-4 rounded-lg flex-shrink-0">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
        onClick={handleItemButtonClick}
      />

      <div className="mt-2 text-center">
        <h2 className="text-xl font-bold">{title}</h2>

        <p>{price}</p>

        <div className="flex items-center justify-between mt-2">
          <motion.button
            onClick={handleAddToBag}
            className={`text-xs py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 

              ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-gray-500 text-white hover:bg-gray-700"
              }`}
            animate={controls}
          >
            {isAdded ? "Added!" : "Add to Bag"}
          </motion.button>

          <button onClick={toggleFavourite} className="ml-2 focus:outline-none">
            {isFavourite ? (
              <FaHeart className="w-6 h-6 text-red-500" />
            ) : (
              <FaRegHeart className="w-6 h-6 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
