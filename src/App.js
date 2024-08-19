import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Favourites from "./components/Favourites";
import AuthProvider from "./components/AuthProvider";
import EarringsRaw from "./components/EarringsRaw";
import BraceletsRaw from "./components/BraceletsRaw";
import RingsRaw from "./components/RingsRaw";
import NecklacesRaw from "./components/NecklacesRaw";
import ShoppingBag from "./components/ShoppingBag";
import AllProducts from "./components/AllItems";
import MyAccount from "./pages/MyAccount";
import ProductDetails from "./pages/ItemDetails";
import { ShoppingBagProvider } from "./contexts/ShoppingBagContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import SearchResults from "./components/SearchResults";
import CheckoutPage from "./components/CheckoutPage";
import AnimatedPage from "./services/api";

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "GBP",
};

const App = () => {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <PayPalScriptProvider options={initialOptions}>
          <ShoppingBagProvider>
            <Router>
              <Navbar />
              <AppRoutes />
            </Router>
          </ShoppingBagProvider>
        </PayPalScriptProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <HomePage />
            </AnimatedPage>
          }
        />
        <Route
          path="/earrings"
          element={
            <AnimatedPage>
              <EarringsRaw />
            </AnimatedPage>
          }
        />
        <Route
          path="/rings"
          element={
            <AnimatedPage>
              <RingsRaw />
            </AnimatedPage>
          }
        />
        <Route
          path="/necklaces"
          element={
            <AnimatedPage>
              <NecklacesRaw />
            </AnimatedPage>
          }
        />
        <Route
          path="/bracelets"
          element={
            <AnimatedPage>
              <BraceletsRaw />
            </AnimatedPage>
          }
        />
        <Route
          path="/favourites"
          element={
            <AnimatedPage>
              <Favourites />
            </AnimatedPage>
          }
        />
        <Route
          path="/shopping-bag"
          element={
            <AnimatedPage>
              <ShoppingBag />
            </AnimatedPage>
          }
        />
        <Route
          path="/all-products"
          element={
            <AnimatedPage>
              <AllProducts />
            </AnimatedPage>
          }
        />
        <Route
          path="/my-account/:user_id"
          element={
            <AnimatedPage>
              <MyAccount />
            </AnimatedPage>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <AnimatedPage>
              <ProductDetails />
            </AnimatedPage>
          }
        />
        <Route
          path="/search-results"
          element={
            <AnimatedPage>
              <SearchResults />
            </AnimatedPage>
          }
        />
        <Route
          path="/checkout"
          element={
            <AnimatedPage>
              <CheckoutPage />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
