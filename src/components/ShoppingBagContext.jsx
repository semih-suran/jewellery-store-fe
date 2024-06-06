import React, { createContext, useState } from "react";

export const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (item) => {
    setBagItems([...bagItems, item]);
  };

  const removeFromBag = (index) => {
    const newBagItems = [...bagItems];
    newBagItems.splice(index, 1);
    setBagItems(newBagItems);
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
