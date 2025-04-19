import React, { useEffect, useState } from "react";
import { useFavorites } from "../Components/FavoriteManager";
import { useNavigate } from "react-router-dom";
import watchImg from "../Components/assets/watch.jpg";
import walletImg from "../Components/assets/wallet.jpg";
import sunglassesImg from "../Components/assets/sunglasses.jpg";
import beltImg from "../Components/assets/belt.jpg";
import "./WomensFashion.css";

const MensAccessories = () => {
  const [filter, setFilter] = useState("all");
  const [dynamicAccessories, setDynamicAccessories] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  // Static items
  const staticAccessories = [
    {
      name: "Luxury Leather Watch",
      image: watchImg,
      price: "$150",
      description: "Elegant leather strap watch for daily wear.",
      category: "watch",
      tag: "Hot",
      colors: ["#000000", "#4b4b4b"],
    },
    {
      name: "Classic Bifold Wallet",
      image: walletImg,
      price: "$45",
      description: "Slim leather wallet with card slots.",
      category: "wallet",
      tag: "New",
      colors: ["#5a3825", "#3e2723"],
    },
    {
      name: "Aviator Sunglasses",
      image: sunglassesImg,
      price: "$80",
      description: "Stylish aviator sunglasses with UV protection.",
      category: "sunglasses",
      tag: "Trending",
      colors: ["#333333", "#999999"],
    },
    {
      name: "Formal Leather Belt",
      image: beltImg,
      price: "$35",
      description: "Genuine leather belt, ideal for formal outfits.",
      category: "belt",
      tag: "New",
      colors: ["#4a2c2a", "#2e1e1e"],
    },
  ];

  // Fetch backend products with accessory-related categories
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) =>
          ["watch", "wallet", "sunglasses", "belt"].includes(item.category?.toLowerCase())
        );
        setDynamicAccessories(filtered);
      })
      .catch((err) => console.error("Failed to load accessories:", err));
  }, []);

  const allAccessories = [...staticAccessories, ...dynamicAccessories];

  const filteredAccessories =
    filter === "all"
      ? allAccessories
      : allAccessories.filter(
          (item) => item.category?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="womens-fashion-section py-5 womens-fashion">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h6 className="text-uppercase letter-spacing-3 text-primary fade-in">
            Men’s Essentials
          </h6>
          <h2 className="display-4 fw-bold mb-4 section-heading">
            Men's Accessories Collection
          </h2>
          <div className="separator-gradient mx-auto" />
        </div>

        <div className="filter-buttons text-center mb-5">
          <div className="btn-group" role="group">
            {["all", "watch", "wallet", "sunglasses", "belt"].map((cat) => (
              <button
                key={cat}
                className={`btn btn-filter ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {filteredAccessories.length === 0 ? (
            <div className="col-12 text-center">
              <p>No accessories found in this category.</p>
            </div>
          ) : (
            filteredAccessories.map((item, index) => {
              const isFavorite = favorites.some((fav) => fav.name === item.name);
              return (
                <div className="col-lg-3 col-md-6 col-12 d-flex" key={index}>
                  <div className="product-card w-100 d-flex flex-column">
                    <div className="product-image">
                      <img
                        src={
                          item.image?.includes("uploads")
                            ? `http://localhost:5000/${item.image}`
                            : item.image
                        }
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
                            onClick={() => navigate("/cart", { state: { product: item } })}
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
                          <span className="current-price">{item.price}</span>
                        </div>
                        <button
                          className="btn btn-add-cart mt-3"
                          onClick={() => navigate("/cart", { state: { product: item } })}
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

export default MensAccessories;
