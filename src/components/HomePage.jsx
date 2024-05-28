import React from "react";
import Footer from "./Footer";
import EarRings from "./Earrings";
import Rings from "./Rings";
import Necklaces from "./Necklaces";
// import Bracelets from './Bracelets'; // Ignore for now

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow space-y-8">
        <h1 className="text-4xl font-bold text-center py-8">Jewellery Store</h1>
        <EarRings />
        <Rings />
        <Necklaces />
        {/* <Bracelets /> */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
