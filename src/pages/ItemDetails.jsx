import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { ShoppingBagContext } from "../contexts/ShoppingBagContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { FaHeart, FaRegHeart, FaCartPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const quantity = 1;
  const { addToBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const [isAdded, setIsAdded] = useState(false);
  const isFavourite = favourites.some(
    (item) => item.item_id === product?.item_id
  );
  const controls = useAnimation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleAddToBag = () => {
    addToBag({ ...product, quantity });
    setIsAdded(true);
    controls.start({ scale: 1.2, transition: { duration: 0.1 } }).then(() => {
      controls.start({ scale: 1, transition: { duration: 0.1 } });
    });
  };

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(product);
    } else {
      addToFavourites(product);
    }
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setIsAdded(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

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
              <motion.button
                onClick={handleAddToBag}
                className="mx-4 text-white rounded"
                animate={controls}
              >
                {isAdded ? (
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
    </div>
  );
};

export default ProductDetails;
