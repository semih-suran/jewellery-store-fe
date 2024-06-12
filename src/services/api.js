import axios from "axios";

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

