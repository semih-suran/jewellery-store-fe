import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  addUserBagItem,
  addUserFavouriteItem,
  removeUserFavouriteItem,
} from "../services/api";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { FaHeart, FaRegHeart, FaCartPlus, FaStar } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { AuthContext } from "../components/AuthProvider";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [item, setItem] = useState(null);
  const { user } = useContext(AuthContext);
  const controls = useAnimation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const quantity = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };
    fetchData();
  }, [productId]);
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
          the_item_id: item.the_item_id,
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

    setTimeout(() => {
      setIsAddedToBag(false);
      setIsButtonDisabled(false);
    }, 500);
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      const fetchedItem = await fetchProductById(productId);
      setItem(fetchedItem);
      setIsFavourite(
        favourites.some((favItem) => favItem.item_id === productId)
      );
    };
    fetchItemDetails();
  }, [productId, favourites]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images_url.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images_url.length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!product) {
    return <p>Loading...</p>;
  }

  const formattedReviewScore =
    product.review_score === "0.00"
      ? "No Reviews Yet"
      : parseFloat(product.review_score).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex flex-col md:flex-row items-center mt-4">
          <div className="relative w-full md:w-1/2" {...swipeHandlers}>
            <motion.img
              key={currentImageIndex}
              src={product.images_url[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            />
            {product.images_url.length > 1 && (
              <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
                <button
                  onClick={handlePrevImage}
                  className="bg-gray-700 text-white p-2 rounded-l"
                >
                  {"<"}
                </button>
                <button
                  onClick={handleNextImage}
                  className="bg-gray-700 text-white p-2 rounded-r"
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-8">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              £{product.price}
            </p>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <FaStar className="text-yellow-500" />
                <p className="ml-1">{formattedReviewScore}</p>
              </div>
              <motion.button
                onClick={handleAddToBag}
                className="mx-4 text-white rounded"
                animate={controls}
              >
                {isAddedToBag ? (
                  <BsFillCartCheckFill className="w-6 h-6 text-green-500 hover:text-green-700" />
                ) : (
                  <FaCartPlus className="w-6 h-6 text-gray-500 hover:text-black" />
                )}
              </motion.button>
              <button onClick={toggleFavourite} className="focus:outline-none">
                {isFavourite ? (
                  <FaHeart className="w-6 h-6 text-red-500 hover:text-red-700" />
                ) : (
                  <FaRegHeart className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                )}
              </button>
            </div>
            <p className="text-xl text-gray-800 mb-4">{product.description}</p>
            <p className="text-xl text-gray-800 mb-4">Type: {product.type}</p>
            <p className="text-xl text-gray-800 mb-4">Style: {product.style}</p>
            <p className="text-xl text-gray-800 mb-4">Size: {product.size}</p>
            <p className="text-xl text-gray-800 mb-4">
              Color: {product.color1}, {product.color2}
            </p>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ProductDetails;
