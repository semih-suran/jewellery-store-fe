import React, { useState } from "react";
import Footer from "./Footer";
import EarRings from "./Earrings";
import Rings from "./Rings";
import Necklaces from "./Necklaces";
import Bracelets from "./Bracelets";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow space-y-8">
        <h1 className="text-4xl font-bold text-center py-8 pb-0">Jewellery Store</h1>
        <form onSubmit={handleSearchSubmit} className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Search... ((Under Development))"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-70 px-4 py-2 border rounded-md"
          />
        </form>
        <EarRings />
        <Rings />
        <Necklaces />
        <Bracelets />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
