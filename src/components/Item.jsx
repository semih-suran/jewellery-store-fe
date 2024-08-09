import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { AuthContext } from "./AuthProvider";
import { FaHeart, FaRegHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
import {
  fetchProductById,
  addUserBagItem,
  removeUserBagItem,
  addUserFavouriteItem,
  removeUserFavouriteItem,
  fetchUserBag,
} from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";

const Item = ({ id }) => {
  const { addToBag, removeFromBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const { user } = useContext(AuthContext);
  const [inBag, setInBag] = useState(false);
  const [item, setItem] = useState(null);

  const quantity = 1;
  const isFavourite = favourites.some((favItem) => favItem.item_id === id);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfInBag = async () => {
      if (user) {
        const bagItems = await fetchUserBag(user.user_id);
        setInBag(bagItems.some((bagItem) => bagItem.item_id === id));
      }
    };

    checkIfInBag();
  }, [user, id]);

  const toggleFavourite = async () => {
    if (user) {
      if (isFavourite) {
        await removeUserFavouriteItem(user.id, id);
        removeFromFavourites({ item_id: id });
      } else {
        await addUserFavouriteItem(user.id, id);
        addToFavourites({
          item_id: id,
          name: item.name,
          images_url: item.images_url,
          price: item.price,
        });
      }
    } else {
      if (isFavourite) {
        removeFromFavourites({ item_id: id });
      } else {
        addToFavourites({
          item_id: id,
          name: item.name,
          images_url: item.images_url,
          price: item.price,
        });
      }
    }
  };

  const handleAddToBag = async () => {
    if (user) {
      if (inBag) {
        await removeUserBagItem(user.user_id, item.the_item_id);
        removeFromBag(item.the_item_id);
        setInBag(false);
      } else {
        await addUserBagItem(user.user_id, item.the_item_id, quantity);
        addToBag({
          item_id: item.the_item_id,
          name: item.name,
          images_url: item.images_url,
          price: item.price,
          quantity,
        });
        setInBag(true);
      }
    } else {
      if (inBag) {
        removeFromBag(item.the_item_id);
        setInBag(false);
      } else {
        addToBag({
          item_id: item.the_item_id,
          name: item.name,
          images_url: item.images_url,
          price: item.price,
          quantity,
        });
        setInBag(true);
      }
    }

    controls.start({ scale: 1.2, transition: { duration: 0.1 } }).then(() => {
      controls.start({ scale: 1, transition: { duration: 0.1 } });
    });
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      const fetchedItem = await fetchProductById(id);
      setItem(fetchedItem);
    };

    fetchItemDetails();
  }, [id]);

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
              animate={controls}
            >
              {inBag ? (
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
