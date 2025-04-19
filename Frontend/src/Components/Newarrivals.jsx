import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../Components/FavoriteManager";
import "./Newarrivals.css";

import img1 from "../Components/assets/paul-cuoco-1bpbyVmG19E-unsplash.jpg";
import img2 from "../Components/assets/rajat-sarki-3Pu0cktLZK8-unsplash.jpg";

const staticProducts = [
  {
    id: "static-1",
    name: "Casual Cotton Shirt",
    category: "Shirts",
    tag: "New",
    rating: 4.5,
    price: "49.99",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    label: "Men's Clothing",
  },
  {
    id: "static-2",
    name: "Sport Running Shoes",
    category: "Shoes",
    tag: "Trending",
    rating: 5.0,
    price: "129.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    label: "Footwear",
  },
  {
    id: "static-3",
    name: "Men's Leather Watch",
    category: "Watch",
    tag: "Hot",
    rating: 4.8,
    price: "99.99",
    image: img1,
    label: "Accessories",
  },
  {
    id: "static-4",
    name: "Luxury Perfume for Him",
    category: "Perfumes",
    tag: "New",
    rating: 4.9,
    price: "89.99",
    image: img2,
    label: "Fragrances",
  },
];

const categories = ["All", "Shirts", "Watch", "Shoes", "Perfumes"];

const Newarrivals = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState("All");
  const [backendArrivals, setBackendArrivals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/arrivals");
        const data = await res.json();
        setBackendArrivals(data);
      } catch (error) {
        console.error("❌ Error fetching arrivals:", error);
      }
    };

    fetchArrivals();
  }, []);

  const handleAddToCart = (product) => {
    navigate("/cart", { state: { product } });
  };

  const allProducts = [
    ...staticProducts,
    ...backendArrivals.map((item) => ({
      ...item,
      id: item._id,
      image: `http://localhost:5000/${item.image}`,
      rating: 4.5,
    })),
  ];

  const filteredProducts =
    filter === "All"
      ? allProducts
      : allProducts.filter(
          (item) => item.category?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className="new-arrivals-section py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h6 className="text-uppercase letter-spacing-3 text-primary fade-in lobster-font">
            Fresh &amp; New
          </h6>
          <h2 className="display-4 fw-bold mb-4 lobster-font">New Arrivals</h2>
          <div className="separator-gradient mx-auto" />
        </div>

        <div className="filter-buttons text-center mb-5">
          <div className="btn-group border-bottom pb-2" role="group">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn btn-link text-uppercase fw-bold px-3 py-1 border-0 ${
                  filter === cat ? "active-filter-link" : "text-muted"
                }`}
                style={{
                  borderBottom: filter === cat ? "3px solid #007bff" : "none",
                  transition: "border-bottom 0.3s ease",
                  fontSize: "1rem",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {filteredProducts.map((item) => {
            const isFavorite = favorites.some(
              (fav) => fav.id === item.id || fav.name === item.name
            );

            return (
              <div className="col-lg-3 col-md-6" key={item.id}>
                <div className="product-card">
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <div className="product-overlay">
                      <div className="product-actions">
                        <button className="action-btn" title="Quick View">
                          <i className="fas fa-eye" />
                        </button>
                        <button
                          className="action-btn"
                          title={
                            isFavorite
                              ? "Remove from Favorites"
                              : "Add to Favorites"
                          }
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
                          onClick={() => handleAddToCart(item)}
                        >
                          <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </div>
                    <span className="product-tag bg-primary">{item.tag || "New"}</span>
                  </div>
                  <div className="product-content">
                    <div className="product-category">{item.category}</div>
                    <h3 className="product-title">{item.name}</h3>
                    <div className="product-rating">
                      {[...Array(Math.floor(item.rating || 4.5))].map((_, i) => (
                        <i className="fas fa-star" key={i} />
                      ))}
                      {item.rating % 1 !== 0 && <i className="fas fa-star-half-alt" />}
                      <span>({item.rating || 4.5})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">PKR {item.price}</span>
                    </div>
                    <button
                      className="btn btn-add-cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart <i className="fas fa-arrow-right ms-2" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <Link
            to="/new-arrivals"
            className="btn btn-outline-primary btn-lg px-5 rounded-pill"
          >
            View All New Arrivals <i className="fas fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Newarrivals;