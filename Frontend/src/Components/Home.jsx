import React from "react";
import "./Home.css"

const Home = () => {
  return (
    <div>
      <>
        <div className="promo-carousel">
          <div
            id="promoCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active bg-gradient-primary">
                <div className="container">
                  <div className="d-flex justify-content-center align-items-center py-2">
                    <span className="promo-text">
                      <i className="fas fa-bolt me-2" />
                      Flash Sale! Up to 70% OFF - Limited Time Offer
                    </span>
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-gradient-success">
                <div className="container">
                  <div className="d-flex justify-content-center align-items-center py-2">
                    <span className="promo-text">
                      <i className="fas fa-shipping-fast me-2" />
                      Free Express Shipping on Orders Over $100
                    </span>
                  </div>
                </div>
              </div>
              <div className="carousel-item bg-gradient-info">
                <div className="container">
                  <div className="d-flex justify-content-center align-items-center py-2">
                    <span className="promo-text">
                      <i className="fas fa-gift me-2" />
                      New Customers: Use Code WELCOME20 for 20% Off
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Hero Section */}
        <section className="hero-section">
          <div className="container-fluid px-0">
            <div
              id="mainCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#mainCarousel"
                  data-bs-slide-to={0}
                  className="active"
                />
                <button
                  type="button"
                  data-bs-target="#mainCarousel"
                  data-bs-slide-to={1}
                />
                <button
                  type="button"
                  data-bs-target="#mainCarousel"
                  data-bs-slide-to={2}
                />
              </div>
              <div className="carousel-inner">
                {/* Slide 1 */}
                <div className="carousel-item active">
                  <div
                    className="hero-slide"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3")',
                    }}
                  >
                    <div className="hero-overlay" />
                    <div className="container">
                      <div className="row min-vh-60 align-items-center">
                        <div className="col-lg-6 text-white">
                          <h6 className="text-uppercase mb-3 letter-spacing-3 fade-in-left">
                            New Collection 2025
                          </h6>
                          <h1 className="display-3 fw-bold mb-4 fade-in-left delay-1">
                            Spring Summer
                            <br />
                            Collection
                          </h1>
                          <p className="lead mb-4 fade-in-left delay-2">
                            Discover the latest trends and styles
                          </p>
                          <button className="btn btn-lg btn-outline-light rounded-0 px-4 fade-in-left delay-3">
                            Shop Now <i className="fas fa-arrow-right ms-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Slide 2 */}
                <div className="carousel-item">
                  <div
                    className="hero-slide"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3")',
                    }}
                  >
                    <div className="hero-overlay" />
                    <div className="container">
                      <div className="row min-vh-60 align-items-center">
                        <div className="col-lg-6 text-white">
                          <h6 className="text-uppercase mb-3 letter-spacing-3">
                            Limited Offer
                          </h6>
                          <h1 className="display-3 fw-bold mb-4">
                            Season Sale
                            <br />
                            Up to 50% Off
                          </h1>
                          <p className="lead mb-4">
                            Don't miss out on our biggest sale of the year
                          </p>
                          <button className="btn btn-lg btn-danger rounded-0 px-4">
                            Shop Sale <i className="fas fa-tag ms-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Slide 3 */}
                <div className="carousel-item">
                  <div
                    className="hero-slide"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3")',
                    }}
                  >
                    <div className="hero-overlay" />
                    <div className="container">
                      <div className="row min-vh-60 align-items-center">
                        <div className="col-lg-6 text-white">
                          <h6 className="text-uppercase mb-3 letter-spacing-3">
                            New Arrivals
                          </h6>
                          <h1 className="display-3 fw-bold mb-4">
                            Exclusive
                            <br />
                            Designer Collection
                          </h1>
                          <p className="lead mb-4">
                            Premium quality at affordable prices
                          </p>
                          <button className="btn btn-lg btn-light rounded-0 px-4">
                            Discover Now{" "}
                            <i className="fas fa-arrow-right ms-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
              </button>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default Home;
