import axios from "axios";

const BASE_URL = "https://thenews-lhhv.onrender.com/api";

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
