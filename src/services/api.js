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

export const handleBagButtonClick = () => {
  alert("Shopping Bag is still under development!");
};
export const handleItemButtonClick = () => {
  alert("This item is still under development!");
};
