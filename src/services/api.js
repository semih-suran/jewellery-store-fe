import axios from "axios";
import React from "react";
import { motion } from "framer-motion";

const BASE_URL = "https://thenews-lhhv.onrender.com/api";

export const fetchAllItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
};

export const fetchBracelets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items/type/bracelet`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bracelets:", error);
    return [];
  }
};

export const fetchEarrings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items/type/earring`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all earrings:", error);
    return [];
  }
};

export const fetchRings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items/type/ring`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all rings:", error);
    return [];
  }
};

export const fetchNecklaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items/type/necklace`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all necklaces:", error);
    return [];
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/items/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by ID ${productId}:`, error);
    return null;
  }
};

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/items`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export const handleItemButtonClick = () => {
  alert("This item is still under development!");
};

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
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
