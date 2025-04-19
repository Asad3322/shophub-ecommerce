import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  return (
    <div>
      <section className="categories-section py-5">
        <div className="container">
          {/* Section Header */}
          <div className="section-header text-center mb-5">
            <h6 className="text-uppercase letter-spacing-3 text-primary fade-in">
              Shop by Category
            </h6>
            <h2 className="display-4 fw-bold mb-4">Featured Categories</h2>
            <div className="separator mx-auto" />
          </div>

          {/* Categories Grid */}
          <div className="row g-4">
            {/* Category 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="category-image">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                    alt="Women's Fashion Category"
                  />
                  <div className="category-overlay" />
                  <div className="category-content">
                    <h3 className="category-title">Women's Fashion</h3>
                    <p className="category-items">248 Items</p>
                    <Link to="/categories/womens-fashion" className="btn btn-outline-light rounded-0">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="category-image">
                  <img
                    src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59"
                    alt="Men's Collection Category"
                  />
                  <div className="category-overlay" />
                  <div className="category-content">
                    <h3 className="category-title">Men's Collection</h3>
                    <p className="category-items">187 Items</p>
                    <Link to="/categories/mens-collection" className="btn btn-outline-light rounded-0">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="category-card">
                <div className="category-image">
                  <img
                    src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d"
                    alt="Accessories Category"
                  />
                  <div className="category-overlay" />
                  <div className="category-content">
                    <h3 className="category-title">Accessories</h3>
                    <p className="category-items">154 Items</p>
                    <Link to="/categories/accessories" className="btn btn-outline-light rounded-0">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 4 */}
            <div className="col-lg-6 col-md-6">
              <div className="category-card category-card-large">
                <div className="category-image">
                  <img
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27"
                    alt="New Arrivals"
                  />
                  <div className="category-overlay category-overlay-gradient" />
                  <div className="category-content">
                    <span className="badge bg-danger mb-3">New Collection</span>
                    <h3 className="category-title">New Arrivals</h3>
                    <p className="category-items">Latest Fashion Trends</p>
                    <Link to="/new-arrivals" className="btn btn-light rounded-0">
                      Explore Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 5 - Special Offers (Updated) */}
            <div className="col-lg-6 col-md-12">
              <div className="category-card category-card-large">
                <div className="category-image">
                  <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
                    alt="Special Offers"
                  />
                  <div className="category-overlay category-overlay-gradient" />
                  <div className="category-content">
                    <span className="badge bg-warning mb-3">Limited Time</span>
                    <h3 className="category-title">Special Offers</h3>
                    <p className="category-items">Up to 50% Off</p>
                    <Link to="/deals" className="btn btn-light rounded-0">
                      Shop Sale
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
