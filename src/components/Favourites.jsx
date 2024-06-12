import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "./FavouritesContext";

function Favourites() {
  const { favourites, removeFromFavourites } = useContext(FavouritesContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 pt-32">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-800">Favourites</h1>
        {favourites.length === 0 ? (
          <p>No favourite items yet...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {favourites.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-2 text-center">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p>{item.price}</p>
                  <button
                    onClick={() => removeFromFavourites(item)}
                    className="mt-2 py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none"
                  >
                    Remove from Favourites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          to="/"
          className="mt-4 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}

export default Favourites;
