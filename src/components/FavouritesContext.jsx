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
    setFavourites((prevFavourites) => {
      if (prevFavourites.some((fav) => fav.title === item.title)) {
        return prevFavourites;
      }
      return [...prevFavourites, item];
    });
  };

  const removeFromFavourites = (item) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.title !== item.title)
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
