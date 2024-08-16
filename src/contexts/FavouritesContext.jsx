import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchUserFavourites,
  fetchProductById,
  removeUserFavouriteItem,
} from "../services/api";
import { AuthContext } from "../components/AuthProvider";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadFavourites = async () => {
      if (user) {
        try {
          const userFavourites = await fetchUserFavourites(user.user_id);
          const detailedFavourites = await Promise.all(
            userFavourites.map(async (item) => {
              const productDetails = await fetchProductById("j" + item.item_id);
              return { ...item, ...productDetails };
            })
          );
          setFavourites(detailedFavourites);
        } catch (error) {
          console.error("Failed to fetch user favourites", error);
        }
      } else {
        const storedFavourites =
          JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourites(storedFavourites);
      }
      setLoading(false);
    };

    loadFavourites();
  }, [user, refreshKey]);

  useEffect(() => {
    if (!user) {
      try {
        localStorage.setItem("favourites", JSON.stringify(favourites));
      } catch (error) {
        console.error("Failed to save favourites to local storage:", error);
      }
    }
  }, [favourites, user]);

  const addToFavourites = async (item) => {
    try {
      const productDetails = await fetchProductById(item.item_id);
      const detailedItem = { ...item, ...productDetails };
      setFavourites((prevFavourites) => [...prevFavourites, detailedItem]);
      setRefreshKey((prevKey) => prevKey + 1);

      if (!user) {
        const updatedFavourites = [...favourites, detailedItem];
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      }
    } catch (error) {
      console.error("Failed to add favourite item:", error);
    }
  };

  const removeFromFavourites = async (itemId) => {
    if (user) {
      try {
        await removeUserFavouriteItem(user.user_id, itemId);
        setFavourites((prevFavourites) =>
          prevFavourites.filter((item) => item.the_item_id !== itemId)
        );
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Failed to remove favourite item for user:", error);
      }
    } else {
      const storedFavourites =
        JSON.parse(localStorage.getItem("favourites")) || [];
      const updatedFavourites = storedFavourites.filter(
        (item) => item.item_id !== `j${itemId}`
      );
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, loading, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
