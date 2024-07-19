import React, { createContext, useState } from "react";

export const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (item) => {
    console.log("addtobag item >>>", item);
    setBagItems((prevBagItems) => {
      if (prevBagItems.some((bagItem) => bagItem.item_id === item.item_id)) {
        return prevBagItems;
      }
      return [...prevBagItems, item];
    });
  };

  const removeFromBag = (itemId) => {
    setBagItems((prevBagItems) =>
      prevBagItems.filter((item) => item.item_id !== itemId)
    );
  };

  const clearBag = () => {
    setBagItems([]);
  };

  return (
    <ShoppingBagContext.Provider
      value={{ bagItems, addToBag, removeFromBag, clearBag }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
