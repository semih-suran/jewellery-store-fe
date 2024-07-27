import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";

const Item = ({ id, name, images_url, price }) => {
  const { addToBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const isFavourite = favourites.some((item) => item.item_id === id);
  const controls = useAnimation();
  const navigate = useNavigate();

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites({ item_id: id });
    } else {
      addToFavourites({ item_id: id, name, images_url, price });
    }
  };

  const handleAddToBag = () => {
    addToBag({ item_id: id, name, images_url, price, quantity });
    setIsAdded(true);
    controls.start({ scale: 1.2, transition: { duration: 0.1 } }).then(() => {
      controls.start({ scale: 1, transition: { duration: 0.1 } });
    });
  };

  const handleNavigate = () => {
    navigate(`/product/${id}`);
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
    <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow-md flex-shrink-0">
      <img
        src={images_url}
        alt={name}
        className="w-full h-48 object-contain rounded-lg cursor-pointer"
        onClick={handleNavigate}
      />
      <div className="mt-2 text-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p>£{price}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <label htmlFor="quantity" className="mr-2 text-gray-800">
              Qty:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-16 p-2 border rounded"
            />
          </div>
          <motion.button
            onClick={handleAddToBag}
            className="text-xs py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            animate={controls}
          >
            {isAdded ? (
              <BsFillCartCheckFill className="w-6 h-6 text-green-500 hover:text-green-700" />
            ) : (
              <FaCartPlus className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            )}
          </motion.button>

          <button onClick={toggleFavourite} className="ml-2 focus:outline-none">
            {isFavourite ? (
              <FaHeart className="w-6 h-6 text-red-500 hover:text-red-700" />
            ) : (
              <FaRegHeart className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
