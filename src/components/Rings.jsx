import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import Arrow from "./Arrow";
import { fetchArticlesByTopic, formatPrice } from "../services/api";

const Rings = () => {
  const [items, setItems] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchArticlesByTopic("football");
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
    <div className="relative bg-white p-4 shadow-md rounded-lg pt-32">
      <h2 className="text-2xl font-semibold mb-4">Rings</h2>
      <div className="relative">
        <Arrow direction="left" onClick={() => scroll("left")} />
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
        >
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
        <Arrow direction="right" onClick={() => scroll("right")} />
      </div>
    </div>
  );
};

export default Rings;
