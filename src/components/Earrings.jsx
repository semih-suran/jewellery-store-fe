// src/components/Earrings.js
import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import Arrow from "./Arrow";
import { fetchArticlesByTopic } from "../services/api";

const Earrings = () => {
  const [items, setItems] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchArticlesByTopic("cooking");
        setItems(articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setItems([]);
      }
    };
    fetchData();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Earrings</h2>
      <div className="relative">
        <Arrow direction="left" onClick={() => scroll("left")} />
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
        >
          {items.map((item, index) => (
            <Item
              key={index}
              price={item.votes}
              imageUrl={item.article_img_url} // Display only the article image
              title={item.title}
              onClick={() => alert(`Clicked on ${item.title}`)}
            />
          ))}
        </div>
        <Arrow direction="right" onClick={() => scroll("right")} />
      </div>
    </div>
  );
};

export default Earrings;
