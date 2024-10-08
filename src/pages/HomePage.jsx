import React, { Suspense, lazy, useEffect, useRef } from "react";
import Footer from "../components/Footer";

const Earrings = lazy(() => import("../containers/Earrings"));
const Rings = lazy(() => import("../containers/Rings"));
const Necklaces = lazy(() => import("../containers/Necklaces"));
const Bracelets = lazy(() => import("../containers/Bracelets"));

const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const speed = 0.5;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${
          scrollPosition * speed
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-32">
      <div className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/media/JewelleryPromoVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Jewellery promotional video"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white text-center">
            Discover Elegance
          </h1>
        </div>
      </div>

      <main className="flex-grow space-y-8">
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
