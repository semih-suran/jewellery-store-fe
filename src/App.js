import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage.jsx";
import Favourites from "./components/Favourites";
import ShoppingCart from "./components/ShoppingCart";
import AuthProvider from "./components/AuthProvider.jsx";
import Earrings from "./components/Earrings.jsx";
import Bracelets from "./components/Bracelets.jsx";
import Rings from "./components/Rings.jsx";
import Necklaces from "./components/Necklaces.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/rings" element={<Rings />} />
          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
