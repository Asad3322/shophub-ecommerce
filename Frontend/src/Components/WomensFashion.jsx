import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../Components/FavoriteManager";
import "./WomensFashion.css";

import olive from "../Components/assets/olive-kurta.jpg";
import duo from "../Components/assets/traditional-duo.jpg";
import blossom from "../Components/assets/crimson-blossom.jpg";
import makeupBag from "../Components/assets/makeup-bag.jpg";
import handbag from "../Components/assets/handbag.jpg";
import lipstick from "../Components/assets/lipstick-set.jpg";
import smokeyEyes from "../Components/assets/smokey-eye-makeup.jpg";
import eyes from "../Components/assets/eyes.jpg";

const WomensFashion = () => {
  const [filter, setFilter] = useState("all");
  const [dynamicProducts, setDynamicProducts] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const localProducts = [
    {
      name: "Olive Mirror Work Kurta",
      image: olive,
      price: "PKR 3,499",
      description: "Bold olive kurta accented with handcrafted mirror work and deep maroon motifs.",
      category: "Clothing",
      tag: "New",
      colors: ["#333", "#772"],
    },
    {
      name: "Traditional Duo Embroidered Set",
      image: duo,
      price: "PKR 4,250",
      description: "Maroon and navy tunics with golden-thread embroidery.",
      category: "Clothing",
      tag: "Trending",
      colors: ["#800", "#001f3f"],
    },
    {
      name: "Crimson Blossom 3-Piece Suit",
      image: blossom,
      price: "PKR 4,999",
      description: "Beige and crimson floral suit with digital prints.",
      category: "Clothing",
      tag: "Hot",
      colors: ["#be1931", "#f5f5dc"],
    },
    {
      name: "Luxury Designer Handbag",
      image: makeupBag,
      price: "PKR 5,000",
      description: "Premium handbag with compartments.",
      category: "Accessories",
      tag: "Trending",
      colors: ["#000", "#a52a2a"],
    },
    {
      name: "Leather Backpack",
      image: handbag,
      price: "PKR 4,200",
      description: "Durable leather backpack with ample space.",
      category: "Accessories",
      tag: "New",
      colors: ["#3e2723", "#795548"],
    },
    {
      name: "Makeup Brush Cleaners",
      image: lipstick,
      price: "PKR 1,200",
      description: "High-quality brush cleaner.",
      category: "Beauty",
      tag: "Hot",
      colors: ["#000", "#f8f8f8"],
    },
    {
      name: "Smokey Eyes Makeup Kit",
      image: smokeyEyes,
      price: "PKR 2,500",
      description: "Luxurious smokey eye kit.",
      category: "Beauty",
      tag: "New",
      colors: ["#111", "#555"],
    },
    {
      name: "Premium Makeup Set",
      image: eyes,
      price: "PKR 3,000",
      description: "Full makeup kit for flawless beauty.",
      category: "Beauty",
      tag: "Trending",
      colors: ["#c71585", "#800080"],
    },
  ];

  // Fetch dynamic products (optional, if you're loading from backend too)
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const womenProducts = data.filter((product) =>
          ["clothing", "accessories", "beauty"].includes(product.category?.toLowerCase())
        );
        setDynamicProducts(womenProducts);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const allProducts = [...localProducts, ...dynamicProducts];

  const filteredProducts =
    filter === "all"
      ? allProducts
      : allProducts.filter(
          (product) => product.category?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="womens-fashion-section py-5 womens-fashion">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h6 className="text-uppercase letter-spacing-3 text-primary fade-in">
            Fresh & Fabulous
          </h6>
          <h2 className="display-4 fw-bold mb-4 section-heading">
            Women's Fashion Collection
          </h2>
          <div className="separator-gradient mx-auto" />
        </div>

        <div className="filter-buttons text-center mb-5">
          <div className="btn-group" role="group">
            {["all", "clothing", "accessories", "beauty"].map((cat) => (
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
          {filteredProducts.length === 0 ? (
            <div className="col-12 text-center">
              <p>No products found in this category</p>
            </div>
          ) : (
            filteredProducts.map((item, index) => {
              const isFavorite = favorites.some((fav) => fav.name === item.name);
              return (
                <div className="col-lg-3 col-md-6 d-flex" key={index}>
                  <div className="product-card w-100 d-flex flex-column">
                    <div className="product-image">
                      <img
                        src={item.image?.includes("uploads")
                          ? `http://localhost:5000/${item.image}`
                          : item.image}
                        alt={item.name}
                      />
                      <div className="product-overlay">
                        <div className="product-actions">
                          <button className="action-btn">
                            <i className="fas fa-eye" />
                          </button>
                          <button
                            className="action-btn"
                            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            onClick={() => toggleFavorite(item)}
                          >
                            <i
                              className={
                                isFavorite
                                  ? "fas fa-heart text-danger"
                                  : "far fa-heart"
                              }
                            />
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
                          <span className="current-price">{item.price}</span>
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

export default WomensFashion;
