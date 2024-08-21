import React, { useEffect, useRef, useState } from "react";

const UnderDevelopment = ({ show, onClose, message }) => {
  const modalRef = useRef();
  const [modalPosition, setModalPosition] = useState({
    top: "50%",
    left: "50%",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const updateModalPosition = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const top = scrollY + viewportHeight / 2;
      setModalPosition({ top: `${top}px`, left: "50%" });
    };

    if (show) {
      updateModalPosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", updateModalPosition);
      window.addEventListener("scroll", updateModalPosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updateModalPosition);
      window.removeEventListener("scroll", updateModalPosition);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: modalPosition.top,
          left: modalPosition.left,
        }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Under Development
        </h2>
        <p className="text-gray-600 mb-6">
          {message ||
            "This functionality is still under development. Please bear with us!"}
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopment;
