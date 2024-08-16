import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeartBroken, FaCartPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "./AuthProvider";
import { addUserBagItem } from "../services/api";

function Favourites() {
  const { favourites, removeFromFavourites, loading } =
    useContext(FavouritesContext);
  const { addToBag } = useContext(ShoppingBagContext);
  const { user } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState({});

  const quantity = 1;

  const handleAddToBag = async (item) => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    setIsAddedToBag((prevState) => ({ ...prevState, [item.item_id]: true }));

    if (user) {
      await addUserBagItem(user.user_id, item.the_item_id, quantity);
      addToBag({
        item_id: item.item_id,
        the_item_id: item.the_item_id,
        name: item.name,
        images_url: item.images_url,
        price: item.price,
        quantity: quantity,
      });
    } else {
      addToBag({
        item_id: item.item_id,
        the_item_id: item.the_item_id,
        name: item.name,
        images_url: item.images_url,
        price: item.price,
        quantity: quantity,
      });
    }

    handleRemoveFromFavourites(item);

    setTimeout(() => {
      setIsAddedToBag(false);
      setIsButtonDisabled(false);
    }, 500);
  };

  const handleRemoveFromFavourites = (item) => {
    setIsAddedToBag((prevState) => ({
      ...prevState,
      [item.item_id]: "removing",
    }));
    setTimeout(() => {
      removeFromFavourites(item.the_item_id);
    }, 500);
  };

  useEffect(() => {
    if (!loading) {
      const newIsAdded = {};
      favourites.forEach((item) => {
        newIsAdded[item.item_id] = false;
      });
      setIsAddedToBag(newIsAdded);
    }
  }, [favourites, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-800">Favourites</h1>
        {favourites.length === 0 ? (
          <p>No favourite items yet...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <AnimatePresence>
              {favourites.map((item) => (
                <motion.div
                  key={item.item_id}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: isAddedToBag[item.item_id] === "removing" ? 0 : 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <Link to={`/product/${item.item_id}`}>
                    <img
                      src={item.images_url}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="mt-2 text-center">
                      <h2 className="text-xl font-bold">{item.name}</h2>
                    </div>
                  </Link>
                  <p className="text-center">£{item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <motion.button
                      onClick={() => handleAddToBag(item)}
                      className="text-xs py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      animate={{
                        scale:
                          isAddedToBag[item.item_id] &&
                          isAddedToBag[item.item_id] !== "removing"
                            ? [1, 1.2, 1]
                            : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {isAddedToBag[item.item_id] &&
                      isAddedToBag[item.item_id] !== "removing" ? (
                        <BsFillCartCheckFill className="w-6 h-6 text-green-500 hover:text-green-700" />
                      ) : (
                        <FaCartPlus className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                      )}
                    </motion.button>
                    <button
                      onClick={() => handleRemoveFromFavourites(item)}
                      className="ml-2 focus:outline-none"
                    >
                      <FaHeartBroken className="w-6 h-6 text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourites;
