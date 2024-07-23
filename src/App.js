import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Favourites from "./components/Favourites";
import AuthProvider from "./components/AuthProvider";
import EarringsRaw from "./components/EarringsRaw";
import BraceletsRaw from "./components/BraceletsRaw";
import RingsRaw from "./components/RingsRaw";
import NecklacesRaw from "./components/NecklacesRaw";
import ShoppingBag from "./components/ShoppingBag";
import AllProducts from "./components/AllProducts";
import MyAccount from "./components/MyAccount";
import ProductDetails from "./components/ProductDetails";
import { ShoppingBagProvider } from "./components/ShoppingBagContext";
import AnimatedPage from "./services/api";
import FavouritesProvider from "./components/FavouritesContext";
import SearchResults from "./components/SearchResults";

const App = () => {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <ShoppingBagProvider>
          <Router>
            <Navbar />
            <AppRoutes />
          </Router>
        </ShoppingBagProvider>
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
          path="/my-account"
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
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
