import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchSearchResults } from "../services/api"; // <<<<<<<<<

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      const results = await fetchSearchResults(e.target.value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsExpanded(false);
    setSearchResults([]);
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
        <button onClick={handleIconClick} className="px-4 py-2 rounded-full">
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
          <button type="submit" className="px-4 py-2">
            <FaSearch className="text-gray-700" />
          </button>
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSearch(result.name);
                    setIsExpanded(false);
                    setSearchResults([]);
                  }}
                >
                  {result.name}
                </div>
              ))}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchBar;
