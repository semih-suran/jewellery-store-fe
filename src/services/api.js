import axios from "axios";
import React from "react";
import { motion } from "framer-motion";

// const BASE_URL = "http://localhost:9090/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchAllItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all items:", error);
    return [];
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/shoppingusers`, {
      firstName: userData.first_name,
      lastName: userData.last_name,
      nickname: userData.nickname,
      email: userData.email,
      password: userData.password,
      picture: userData.avatar,
      mobilePhone: userData.mobile_phone,
      street: userData.street,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipcode,
      country: userData.country,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export const googleLoginUser = async (tokenId) => {
  try {
    const response = await axios.post(`${BASE_URL}/google-login`, { tokenId });
    return response;
  } catch (error) {
    console.error("Error in googleLoginUser:", error);
    throw error;
  }
};

export const algoliasearch = require("algoliasearch");

fetch(`${BASE_URL}/items`)
  .then((data) => data.json())
  .then((records) => {
    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_APP_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY
    );

    const index = client.initIndex("jewellery-store");

    index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
  })
  .catch((error) => {
    console.error(error);
  });

export const fetchItemsByType = async (type) => {
  try {
    const response = await axios.get(`${BASE_URL}/items/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching items of type ${type}:`, error);
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

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shoppingusers/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by ID ${userId}:`, error);
    throw error;
  }
};

export const updateUserAddress = async (userId, addressData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/shoppingusers/${userId}/address`,
      addressData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating address for user ${userId}:`, error);
    throw error;
  }
};

export const updateUserNickname = async (userId, nicknameData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/shoppingusers/${userId}/nickname`,
      nicknameData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating address for user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserBag = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shoppingbag/${userId}`);
    return response.data.items;
  } catch (error) {
    console.error(`Error fetching bag for user ${userId}:`, error);
    throw error;
  }
};

export const addUserBagItem = async (userId, itemId, quantity) => {
  try {
    const response = await axios.post(`${BASE_URL}/shoppingbag`, {
      user_id: userId,
      item_id: itemId,
      quantity: quantity,
    });

    return response.data.item;
  } catch (error) {
    console.error(`Error adding item to bag for user ${userId}:`, error);
    throw error;
  }
};

export const removeUserBagItem = async (userId, itemId) => {
  try {
    await axios.delete(`${BASE_URL}/shoppingbag/${userId}/${itemId}`);
  } catch (error) {
    console.error(`Error removing item from bag for user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserFavourites = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/shoppingfavourites/${userId}`
    );
    return response.data.favourites;
  } catch (error) {
    console.error(`Error fetching favourites for user ${userId}:`, error);
    throw error;
  }
};

export const addUserFavouriteItem = async (userId, itemId) => {
  try {
    const response = await axios.post(`${BASE_URL}/shoppingfavourites`, {
      user_id: userId,
      item_id: itemId,
    });
    return response.data.favourite;
  } catch (error) {
    console.error(`Error adding item to favourites for user ${userId}:`, error);
    throw error;
  }
};

export const removeUserFavouriteItem = async (userId, itemId) => {
  try {
    await axios.delete(`${BASE_URL}/shoppingfavourites/${userId}/${itemId}`);
  } catch (error) {
    console.error(
      `Error removing item from favourites for user ${userId}:`,
      error
    );
    throw error;
  }
};

export const fetchReviewsByItemId = async (itemId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shoppingreviews/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [] };
  }
};

export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/shoppingreviews`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    await axios.delete(`${BASE_URL}/shoppingreviews/${reviewId}`);
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
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
