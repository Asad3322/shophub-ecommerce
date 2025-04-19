import React from "react";
import { useFavorites } from "./FavoriteManager";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Favorite Products ❤️</h2>

      {favorites.length === 0 ? (
        <p className="text-center">You haven’t added any favorites yet.</p>
      ) : (
        <div className="row">
          {favorites.map((product, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={
                    product.image?.includes("uploads")
                      ? `http://localhost:5000/${product.image}`
                      : product.image
                  }
                  alt={product.title || product.name}
                  className="card-img-top"
                  onError={(e) => (e.target.src = "/default-product.jpg")} // optional fallback
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    {product.title || product.name}
                  </h5>
                  <p className="card-text">{product.price}</p>
                  <button
                    className="btn btn-outline-danger mt-auto"
                    onClick={() => toggleFavorite(product)}
                  >
                    Remove ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
