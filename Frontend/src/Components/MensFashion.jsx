import React, { useEffect, useState } from "react";
import { useFavorites } from "./FavoriteManager";
import { useNavigate } from "react-router-dom";
import "./WomensFashion.css";

const MensFashion = () => {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const menCategories = ["shirts", "jeans", "shoes"]; // ✅ actual saved categories

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts =
    filter === "all"
      ? products.filter((product) =>
          menCategories.includes(product.category.toLowerCase())
        )
      : products.filter(
          (product) =>
            menCategories.includes(product.category.toLowerCase()) &&
            product.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="womens-fashion-section py-5 womens-fashion">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h6 className="text-uppercase letter-spacing-3 text-primary fade-in">
            Trending Styles
          </h6>
          <h2 className="display-4 fw-bold mb-4 section-heading">
            Men's Fashion Collection
          </h2>
          <div className="separator-gradient mx-auto" />
        </div>

        <div className="filter-buttons text-center mb-5">
          <div className="btn-group" role="group">
            <button
              className={`btn btn-filter ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`btn btn-filter ${filter === "jeans" ? "active" : ""}`}
              onClick={() => setFilter("jeans")}
            >
              Jeans
            </button>
            <button
              className={`btn btn-filter ${filter === "shirts" ? "active" : ""}`}
              onClick={() => setFilter("shirts")}
            >
              Shirts
            </button>
            <button
              className={`btn btn-filter ${filter === "shoes" ? "active" : ""}`}
              onClick={() => setFilter("shoes")}
            >
              Shoes
            </button>
          </div>
        </div>

        <div className="row g-4">
          {filteredProducts.length === 0 ? (
            <div className="col-12 text-center">
              <p>No products found in this category</p>
            </div>
          ) : (
            filteredProducts.map((item, index) => {
              const isFavorite = favorites.some(
                (fav) => fav.name === item.name
              );

              return (
                <div className="col-lg-3 col-md-6 col-12 d-flex" key={index}>
                  <div className="product-card w-100 d-flex flex-column">
                    <div className="product-image">
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        alt={item.name}
                        className="img-fluid w-100"
                      />
                      <div className="product-overlay">
                        <div className="product-actions">
                          <button className="action-btn" title="Quick View">
                            <i className="fas fa-eye" />
                          </button>

                          <button
                            className="action-btn"
                            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            onClick={() => toggleFavorite(item)}
                          >
                            <i className={isFavorite ? "fas fa-heart text-danger" : "far fa-heart"} />
                          </button>

                          <button
                            className="action-btn"
                            title="Add to Cart"
                            onClick={() =>
                              navigate("/cart", { state: { product: item } })
                            }
                          >
                            <i className="fas fa-shopping-cart" />
                          </button>
                        </div>
                      </div>
                      <span className="product-tag bg-primary">{item.tag}</span>
                    </div>

                    <div className="product-content d-flex flex-column justify-content-between">
                      <div>
                        <div className="product-category">{item.category}</div>
                        <h3 className="product-title">{item.name}</h3>
                        <p className="product-description">{item.description}</p>
                      </div>
                      <div className="mt-auto">
                        <div className="product-price">
                          <span className="current-price">${item.price}</span>
                        </div>
                        <button
                          className="btn btn-add-cart mt-3"
                          onClick={() =>
                            navigate("/cart", { state: { product: item } })
                          }
                        >
                          Shop Now <i className="fas fa-arrow-right ms-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default MensFashion;
