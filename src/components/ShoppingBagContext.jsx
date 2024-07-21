import React, { createContext, useState } from "react";

export const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (item, quantity = 1) => {
    setBagItems((prevBagItems) => {
      const existingItem = prevBagItems.find((bagItem) => bagItem.item_id === item.item_id);
      if (existingItem) {
        return prevBagItems.map((bagItem) =>
          bagItem.item_id === item.item_id
            ? { ...bagItem, quantity: bagItem.quantity + quantity }
            : bagItem
        );
      }
      return [...prevBagItems, { ...item, quantity }];
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

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setBagItems((prevBagItems) =>
      prevBagItems.map((item) =>
        item.item_id === itemId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <ShoppingBagContext.Provider
      value={{ bagItems, addToBag, removeFromBag, clearBag, updateQuantity }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
