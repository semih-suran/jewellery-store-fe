import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchUserBag,
  fetchProductById,
  addUserBagItem,
  removeUserBagItem,
} from "../services/api";
import { AuthContext } from "../components/AuthProvider";

export const ShoppingBagContext = createContext();

export const ShoppingBagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadBagItems = async () => {
      localStorage.removeItem("bagItems");

      if (user) {
        try {
          const userBagItems = await fetchUserBag(user.user_id);
          const detailedBagItems = await Promise.all(
            userBagItems.map(async (bagItem) => {
              const productDetails = await fetchProductById(
                "j" + bagItem.item_id
              );
              return {
                ...bagItem,
                ...productDetails,
              };
            })
          );
          setBagItems(detailedBagItems);
        } catch (error) {
          console.error("Failed to fetch user bag items", error);
        }
      } else {
        const storedBagItems =
          JSON.parse(localStorage.getItem("bagItems")) || [];
        setBagItems(storedBagItems);
      }
    };

    loadBagItems();
  }, [user]);

  useEffect(() => {
    if (!user) {
      try {
        const updatedBagItems = JSON.stringify(bagItems);
        localStorage.setItem("bagItems", updatedBagItems);
      } catch (error) {
        console.error("Failed to update bag item in local storage:", error);
      }
    }
  }, [bagItems, user]);

  const addToBag = (item) => {
    const quantity = item.quantity;
    setBagItems((prevBagItems) => {
      const existingItem = prevBagItems.find(
        (bagItem) => bagItem.item_id === item.item_id
      );
      if (existingItem) {
        return prevBagItems.map((bagItem) =>
          bagItem.item_id === item.item_id
            ? { ...bagItem, quantity: bagItem.quantity + quantity }
            : bagItem
        );
      }
      return [...prevBagItems, { ...item, quantity }];
    });

    if (user) {
      addUserBagItem(user.user_id, item.item_id, quantity).catch((error) => {
        console.error("Failed to update bag item in the backend:", error);
      });
    }
  };

  const removeFromBag = async (itemId) => {
    setBagItems((prevBagItems) =>
      prevBagItems.filter((item) => item.item_id !== itemId)
    );

    if (user) {
      try {
        await removeUserBagItem(user.user_id, itemId);
      } catch (error) {
        console.error("Failed to remove bag item from the backend:", error);

        setBagItems((prevBagItems) => {
          const removedItem = prevBagItems.find(
            (item) => item.item_id === itemId
          );
          return removedItem ? [...prevBagItems, removedItem] : prevBagItems;
        });
      }
    }
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
