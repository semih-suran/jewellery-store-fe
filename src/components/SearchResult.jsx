import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ result, onClick }) => {
  return (
    <Link
      to={`/product/${result.id}`}
      onClick={onClick}
      className="block px-4 py-2 hover:bg-gray-100"
    >
      {result.name}
    </Link>
  );
};

export default SearchResult;
    