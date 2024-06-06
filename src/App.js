import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage.jsx";
import Favourites from "./components/Favourites";
import ShoppingCart from "./components/ShoppingCart";
import AuthProvider from "./components/AuthProvider.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
