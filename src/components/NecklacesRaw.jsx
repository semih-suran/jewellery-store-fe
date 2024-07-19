import React, { useState, useEffect } from "react";
import Item from "./Item";
import Footer from "./Footer";
import { fetchNecklaces } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const NecklacesRaw = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const necklaces = await fetchNecklaces();
        setItems(necklaces || []);
      } catch (error) {
        console.error("Error fetching necklaces:", error);
        setItems([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-gray-800">Necklaces</h1>
        {items.length === 0 ? (
          <p>No products available...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.item_id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Item
                    id={item.item_id}
                    name={item.name}
                    price={item.price}
                    images_url={item.images_url}
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

export default NecklacesRaw;
