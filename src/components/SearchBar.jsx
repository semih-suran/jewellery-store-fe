import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsExpanded(false);
  };

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="relative mt-4 flex justify-center items-center">
      {!isExpanded && (
        <button
          onClick={handleIconClick}
          className="px-4 py-2 rounded-full"
        >
          <FaSearch className="text-gray-700" />
        </button>
      )}
      {isExpanded && (
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center border rounded-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            ref={inputRef}
            className="w-80 px-4 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2"
          >
            <FaSearch className="text-gray-700" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
