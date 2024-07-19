import React, { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (item) => {
    console.log("addtofavourites item >>>", item);
    setFavourites((prevFavourites) => {
      if (prevFavourites.some((fav) => fav.item_id === item.item_id)) {
        return prevFavourites;
      }
      return [...prevFavourites, item];
    });
  };

  const removeFromFavourites = (item) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.item_id !== item.item_id)
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
