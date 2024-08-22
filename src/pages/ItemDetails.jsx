import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  addUserBagItem,
  addUserFavouriteItem,
  removeUserFavouriteItem,
  fetchReviewsByItemId,
  addReview,
  deleteReview,
  fetchUserById,
} from "../services/api";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaStar,
  FaShareAlt,
} from "react-icons/fa";
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
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const quantity = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
        const fetchedReviews = await fetchReviewsByItemId(
          fetchedProduct.the_item_id
        );
        setReviews(fetchedReviews.reviews);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchReviewsWithUserData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);

        const fetchedReviews = await fetchReviewsByItemId(
          fetchedProduct.the_item_id
        );
        const reviewsWithUserData = await Promise.all(
          fetchedReviews.reviews.map(async (review) => {
            const user = await fetchUserById(review.user_id);
            return {
              ...review,
              nickname: user.nickname,
              picture: user.picture,
            };
          })
        );
        setReviews(reviewsWithUserData);
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      }
    };
    fetchReviewsWithUserData();
  }, [productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const reviewData = {
        user_id: user?.user_id,
        item_id: product.the_item_id,
        rating,
        review: newReview,
      };

      const addedReview = await addReview(reviewData);

      setReviews((prev) => [
        ...prev,
        {
          ...addedReview.review,
          nickname: user.nickname,
          picture: user.picture,
        },
      ]);

      setNewReview("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prev) =>
        prev.filter((review) => review.review_id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

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

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const unfilledStars = totalStars - filledStars;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {[...Array(unfilledStars)].map((_, index) => (
          <FaStar key={index + filledStars} className="text-gray-300" />
        ))}
      </>
    );
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "No Reviews Yet";
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(1);
  };

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
                <p className="ml-1">{calculateAverageRating()}</p>
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
              <button onClick={handleShare} className="ml-4 focus:outline-none">
                <FaShareAlt className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
              {isLinkCopied && (
                <p className="ml-2 text-sm text-green-500">Link copied!</p>
              )}
            </div>
            <p className="text-xl text-gray-800 mb-4">{product.description}</p>
            <p className="text-xl text-gray-800 mb-4">Type: {product.type}</p>
            <p className="text-xl text-gray-800 mb-4">Style: {product.style}</p>
            <p className="text-xl text-gray-800 mb-4">Size: {product.size}</p>
            <p className="text-xl text-gray-800 mb-4">
              Primary Color: {product.color1}
            </p>
            <p className="text-xl text-gray-800 mb-4">
              Secondary Color: {product.color2}
            </p>
          </div>
        </div>
        <section className="w-full max-w-3xl mt-8 bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.review_id} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={review.picture}
                      alt={review.nickname}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {review.nickname}
                      </p>
                      <p className="text-sm text-gray-600">{review.review}</p>
                    </div>
                  </div>
                  {user?.user_id === review.user_id && (
                    <button
                      onClick={() => handleDeleteReview(review.review_id)}
                      className="text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(review.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          {user ? (
            <form onSubmit={handleSubmitReview} className="mt-4">
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Add your comment here..."
                className="w-full p-3 border rounded mb-2"
                rows="3"
                required
              ></textarea>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <span className="mr-2">Rating:</span>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border rounded p-1"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <option key={star} value={star}>
                        {star}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-4 text-gray-500">
              Please log in to leave a comment.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
