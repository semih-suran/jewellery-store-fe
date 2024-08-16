import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { AuthContext } from "./AuthProvider";
import { FaHeart, FaRegHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  fetchProductById,
  addUserBagItem,
  addUserFavouriteItem,
  removeUserFavouriteItem,
} from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";

const Item = ({ id }) => {
  const { addToBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const quantity = 0;
  const navigate = useNavigate();

  const toggleFavourite = async () => {
    if (!item || !item.the_item_id) {
      console.error("Item or item_id is missing");
      return;
    }

    setIsFavourite(!isFavourite);
    if (user) {
      if (isFavourite) {
        try {
          await removeUserFavouriteItem(user.user_id, item.the_item_id);
          removeFromFavourites(item.the_item_id);
        } catch (error) {
          console.error("Error removing favourite:", error);
          setIsFavourite(true);
        }
      } else {
        try {
          await addUserFavouriteItem(user.user_id, item.the_item_id);
          addToFavourites({
            user_id: user.user_id,
            item_id: item.the_item_id,
          });
        } catch (error) {
          console.error("Error adding favourite:", error);
          setIsFavourite(false);
        }
      }
    } else {
      if (isFavourite) {
        removeFromFavourites(item.the_item_id);
      } else {
        addToFavourites({
          item_id: item.item_id,
          name: item.name,
          images_url: item.images_url,
          price: item.price,
        });
      }
    }
  };

  const handleAddToBag = async () => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    setIsAddedToBag(true);

    if (user) {
      await addUserBagItem(user.user_id, item.the_item_id, quantity);
      addToBag({
        item_id: item.the_item_id,
        name: item.name,
        images_url: item.images_url,
        price: item.price,
        quantity: quantity + 1,
      });
    } else {
      addToBag({
        item_id: item.item_id,
        name: item.name,
        images_url: item.images_url,
        price: item.price,
        quantity: quantity + 1,
      });
    }

    setTimeout(() => {
      setIsAddedToBag(false);
      setIsButtonDisabled(false);
    }, 500);
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      const fetchedItem = await fetchProductById(id);
      setItem(fetchedItem);
      setIsFavourite(favourites.some((favItem) => favItem.item_id === id));
    };
    fetchItemDetails();
  }, [id, favourites]);

  if (!item) {
    return (
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "200px" }}
      >
        <ClipLoader size={50} color={"#123abc"} loading={!item} />
      </div>
    );
  }

  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  const formattedReviewScore =
    item.review_score === "0.00"
      ? "No Reviews Yet"
      : parseFloat(item.review_score).toFixed(1);

  return (
    <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow-md flex-shrink-0">
      <img
        src={item.images_url[0]}
        alt={item.name}
        className="w-full h-48 object-contain rounded-lg cursor-pointer"
        onClick={handleNavigate}
      />
      <div className="mt-2 text-center">
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p>£{item.price}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-500" />
            <p className="ml-1">{formattedReviewScore}</p>
          </div>
          <div className="flex items-center">
            <motion.button
              onClick={handleAddToBag}
              className="text-xs py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isButtonDisabled}
            >
              {isAddedToBag ? (
                <BsFillCartCheckFill className="w-6 h-6 text-green-500 hover:text-green-700" />
              ) : (
                <FaCartPlus className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              )}
            </motion.button>
            <button
              onClick={toggleFavourite}
              className="ml-2 focus:outline-none"
            >
              {isFavourite ? (
                <FaHeart className="w-6 h-6 text-red-500 hover:text-red-700" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
