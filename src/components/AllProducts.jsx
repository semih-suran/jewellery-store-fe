import React, { useState, useEffect } from "react";
import Item from "./Item";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import { fetchAllArticles, formatPrice } from "../services/api";

const AllProducts = () => {
  const handleSearch = (query) => {
    // Implement search functionality here
    console.log("Searching for:", query);
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchAllArticles();
        setItems(articles || []);
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
          Jewellery Store
        </h1>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Item
              key={index}
              price={formatPrice(item.votes)}
              imageUrl={item.article_img_url}
              title={item.title}
              onClick={() => alert(`Clicked on ${item.title}`)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;
