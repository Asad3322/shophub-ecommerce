import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Deals.css";

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [dynamicDeals, setDynamicDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 24 * 60 * 60 * 1000;
    let deadline = new Date().getTime() + duration;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = deadline - now;

      if (distance < 0) {
        deadline = new Date().getTime() + duration;
        distance = deadline - now;
      }

      const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch dynamic deals from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/deals")
      .then((res) => res.json())
      .then((data) => setDynamicDeals(data))
      .catch((err) => console.error("❌ Error loading deals:", err));
  }, []);

  const handleBuyNow = (product) => {
    navigate("/cart", { state: { product } });
  };

  return (
    <section className="deals-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h6 className="text-uppercase letter-spacing-3 text-danger fade-in">Limited Time Offers</h6>
          <h2 className="display-4 fw-bold mb-4">Hot Deals of the Week</h2>
          <div className="separator-danger mx-auto" />
        </div>

        <div className="flash-sale-timer text-center mb-5">
          <div className="countdown-wrapper">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div className="countdown-item" key={unit}>
                <span className="countdown-number">{value}</span>
                <span className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {/* 🔒 Static Deal 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="deal-card">
              <div className="deal-image">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Product" />
                <div className="deal-tag">-40%</div>
                <div className="deal-actions">
                  <button className="action-btn"><i className="fas fa-heart" /></button>
                  <button
                    className="action-btn"
                    onClick={() => handleBuyNow({
                      name: "Premium Running Shoes",
                      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                      price: "$89.99",
                      description: "High-performance running shoes with premium build.",
                      category: "Shoes",
                      tag: "Flash Sale",
                      colors: ["#000", "#444"]
                    })}
                  >
                    <i className="fas fa-shopping-cart" />
                  </button>
                  <button className="action-btn"><i className="fas fa-search" /></button>
                </div>
              </div>
              <div className="deal-content">
                <div className="deal-meta">
                  <span className="badge bg-danger">Flash Sale</span>
                  <div className="deal-rating">
                    <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><span>(4.5)</span>
                  </div>
                </div>
                <h3 className="deal-title">Premium Running Shoes</h3>
                <div className="deal-price">
                  <span className="new-price">$89.99</span>
                  <span className="old-price">$149.99</span>
                </div>
                <div className="deal-progress">
                  <div className="progress">
                    <div className="progress-bar bg-danger" style={{ width: "75%" }} />
                  </div>
                  <div className="deal-stock">
                    <span>Sold: 15</span>
                    <span>Available: 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🔒 Static Deal 2 */}
          <div className="col-lg-3 col-md-6">
            <div className="deal-card">
              <div className="deal-image">
                <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" alt="Product" />
                <div className="deal-tag">-35%</div>
                <div className="deal-actions">
                  <button className="action-btn"><i className="fas fa-heart" /></button>
                  <button
                    className="action-btn"
                    onClick={() => handleBuyNow({
                      name: "Sport Edition Sneakers",
                      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                      price: "$79.99",
                      description: "Stylish and sporty sneakers for everyday use.",
                      category: "Shoes",
                      tag: "Best Seller",
                      colors: ["#111", "#eee"]
                    })}
                  >
                    <i className="fas fa-shopping-cart" />
                  </button>
                  <button className="action-btn"><i className="fas fa-search" /></button>
                </div>
              </div>
              <div className="deal-content">
                <div className="deal-meta">
                  <span className="badge bg-warning">Best Seller</span>
                  <div className="deal-rating">
                    <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><span>(5.0)</span>
                  </div>
                </div>
                <h3 className="deal-title">Sport Edition Sneakers</h3>
                <div className="deal-price">
                  <span className="new-price">$79.99</span>
                  <span className="old-price">$129.99</span>
                </div>
                <div className="deal-progress">
                  <div className="progress">
                    <div className="progress-bar bg-danger" style={{ width: "85%" }} />
                  </div>
                  <div className="deal-stock">
                    <span>Sold: 25</span>
                    <span>Available: 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🆕 Dynamic Deals from Backend */}
          {dynamicDeals.map((deal) => (
            <div className="col-lg-3 col-md-6" key={deal._id}>
              <div className="deal-card">
                <div className="deal-image">
                  <img src={`http://localhost:5000/${deal.image}`} alt={deal.title} />
                  <div className="deal-tag">-{deal.discount}%</div>
                  <div className="deal-actions">
                    <button className="action-btn"><i className="fas fa-heart" /></button>
                    <button
                      className="action-btn"
                      onClick={() => handleBuyNow({
                        name: deal.title,
                        image: `http://localhost:5000/${deal.image}`,
                        price: deal.discount,
                        description: deal.details,
                        category: "Deal",
                        tag: "New Deal",
                        colors: ["#000"]
                      })}
                    >
                      <i className="fas fa-shopping-cart" />
                    </button>
                    <button className="action-btn"><i className="fas fa-search" /></button>
                  </div>
                </div>
                <div className="deal-content">
                  <div className="deal-meta">
                    <span className="badge bg-info">New Deal</span>
                    <div className="deal-rating">
                      <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><span>(4.2)</span>
                    </div>
                  </div>
                  <h3 className="deal-title">{deal.title}</h3>
                  <div className="deal-price">
                    <span className="new-price">PKR {deal.discount}</span>
                  </div>
                  <div className="deal-progress">
                    <div className="progress">
                      <div className="progress-bar bg-danger" style={{ width: "65%" }} />
                    </div>
                    <div className="deal-stock">
                      <span>Sold: 12</span>
                      <span>Available: 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="text-center mt-5">
          <Link to="/deals" className="btn btn-outline-danger btn-lg rounded-0 px-5">
            View All Deals <i className="fas fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Deals;
