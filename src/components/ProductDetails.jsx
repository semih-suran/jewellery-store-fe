import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { ShoppingBagContext } from "./ShoppingBagContext";
import { FavouritesContext } from "./FavouritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToBag } = useContext(ShoppingBagContext);
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.some((item) => item.name === product?.name);

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
  };

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(product);
    } else {
      addToFavourites(product);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex flex-col md:flex-row items-center mt-4">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={product.images_url[0]}
              alt={product.name}
              className="w-full h-auto"
            />
          </motion.div>
          <div className="w-full md:w-1/2 p-8">
            <p className="text-xl text-gray-800 mb-4">{product.description}</p>
            <p className="text-xl text-gray-800 mb-4">Type: {product.type}</p>
            <p className="text-xl text-gray-800 mb-4">Style: {product.style}</p>
            <p className="text-xl text-gray-800 mb-4">Size: {product.size}</p>
            <p className="text-xl text-gray-800 mb-4">
              Color: {product.color1}, {product.color2}
            </p>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              ${product.price}
            </p>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2 text-gray-800">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-16 p-2 border rounded"
              />
            </div>
            <button
              onClick={handleAddToBag}
              className="bg-black text-white py-2 px-4 rounded mb-4"
            >
              Add to Bag
            </button>
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
      </main>
    </div>
  );
};

export default ProductDetails;
