import axios from "axios";
import React from "react";
import { motion } from "framer-motion";

const BASE_URL = "https://thenews-lhhv.onrender.com/api";

export const fetchAllArticles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/articles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all articles:", error);
    return [];
  }
};

export const fetchArticlesByTopic = async (topic) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles`, {
      params: { topic },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// ** Waiting for Backend to be developed **

// export const fetchFavoritesCount = async (userId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/favorites/count`, { params: { userId } });
//     return response.data.count; // Assuming API returns { count: number }
//   } catch (error) {
//     console.error("Error fetching favorites count:", error);
//     return 0;
//   }
// };

// export const fetchShoppingBagCount = async (userId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/shopping-bag/count`, { params: { userId } });
//     return response.data.count; // Assuming API returns { count: number }
//   } catch (error) {
//     console.error("Error fetching shopping bag count:", error);
//     return 0;
//   }
// };

// ** Waiting for Backend to be developed **

export const formatPrice = (price) => {
  const formattedPrice = price.toFixed(2);
  return `£${formattedPrice}`;
};

export const handleItemButtonClick = () => {
  alert("This item is still under development!");
};

export const addToFavoritesAPI = async (item, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/favorites`, { item, userId });
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};

export const removeFromFavoritesAPI = async (itemId, userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/favorites`, { data: { itemId, userId } });
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;