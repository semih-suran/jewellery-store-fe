import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="mt-4 flex justify-center">
      <input
        type="text"
        placeholder="Search...(Under Development)"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-80 px-4 py-2 border rounded-md"
      />
    </form>
  );
};

export default SearchBar;
