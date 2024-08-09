import React, { Suspense, lazy } from "react";
import Footer from "../components/Footer";

const Earrings = lazy(() => import("../containers/Earrings"));
const Rings = lazy(() => import("../containers/Rings"));
const Necklaces = lazy(() => import("../containers/Necklaces"));
const Bracelets = lazy(() => import("../containers/Bracelets"));

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-24">
      <main className="flex-grow space-y-8">
        <h1 className="text-4xl font-bold text-center py-8 pb-0">Jewellery Store</h1>
        <Suspense fallback={<div>Loading Earrings...</div>}>
          <Earrings />
        </Suspense>
        <Suspense fallback={<div>Loading Rings...</div>}>
          <Rings />
        </Suspense>
        <Suspense fallback={<div>Loading Necklaces...</div>}>
          <Necklaces />
        </Suspense>
        <Suspense fallback={<div>Loading Bracelets...</div>}>
          <Bracelets />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
