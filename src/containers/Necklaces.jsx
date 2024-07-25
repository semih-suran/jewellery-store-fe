import React, { useState, useEffect, useRef } from "react";
import Item from "../components/Item";
import Arrow from "../components/Arrow";
import { fetchNecklaces } from "../services/api";

const Necklaces = () => {
  const [items, setItems] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const necklaces = await fetchNecklaces();
        setItems(necklaces || []);
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
    <div className="relative bg-gray-100 p-4 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Necklaces</h2>
      <div className="relative">
        <Arrow direction="left" onClick={() => scroll("left")} />
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-1"
        >
          {items.map((item, index) => (
            <Item
              key={index}
              id={item.item_id}
              name={item.name}
              price={item.price}
              images_url={item.images_url}
            />
          ))}
        </div>
        <Arrow direction="right" onClick={() => scroll("right")} />
      </div>
    </div>
  );
};

export default Necklaces;
