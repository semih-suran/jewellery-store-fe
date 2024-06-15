import React, { useState, useEffect } from "react";
import Item from "./Item";
import Footer from "./Footer";
import { fetchAllArticles, formatPrice } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const BraceletsRaw = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchAllArticles();
        setItems(articles.items || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setItems([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32 p-8">
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Bracelets</h1>
        <p className="text-s font-bold text-center py-0 pb-0">*under development*</p>
        <p className="text-s font-bold text-center py-0 pb-0">Listing all items for now...</p>
        {items.length === 0 ? (
          <p>No products available...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Item
                    price={formatPrice(item.price)}
                    imageUrl={item.images[0]}
                    title={item.name}
                    onClick={() => alert(`Clicked on ${item.description}`)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BraceletsRaw;
