import React, { useState, useEffect } from "react";
import Item from "./Item";
import Footer from "./Footer";
import { fetchAllArticles, formatPrice } from "../services/api";

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
    <div className="min-h-screen bg-gray-100 flex flex-col pt-24">
      <main className="flex-grow space-y-8">
        <h1 className="text-4xl font-bold text-center py-8 pb-0">
          Bracelets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Item
              key={index}
              price={formatPrice(item.price)}
              imageUrl={item.images[0]}
              title={item.name}
              onClick={() => alert(`Clicked on ${item.description}`)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BraceletsRaw;
