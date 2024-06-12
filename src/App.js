import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage.jsx";
import Favourites from "./components/Favourites";
import AuthProvider from "./components/AuthProvider.jsx";
import Earrings from "./components/Earrings.jsx";
import Bracelets from "./components/Bracelets.jsx";
import Rings from "./components/Rings.jsx";
import Necklaces from "./components/Necklaces.jsx";
import ShoppingBag from "./components/ShoppingBag.jsx";
import AllProducts from "./components/AllProducts.jsx";
import MyAccount from "./components/MyAccount.jsx";
import { ShoppingBagProvider } from "./components/ShoppingBagContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ShoppingBagProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/earrings" element={<Earrings />} />
            <Route path="/rings" element={<Rings />} />
            <Route path="/necklaces" element={<Necklaces />} />
            <Route path="/bracelets" element={<Bracelets />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/shopping-bag" element={<ShoppingBag />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/my-account" element={<MyAccount />} />
          </Routes>
        </Router>
      </ShoppingBagProvider>
    </AuthProvider>
  );
}

export default App;
