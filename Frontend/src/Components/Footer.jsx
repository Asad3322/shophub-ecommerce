import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      {/* Modern Footer with Bootstrap 5 and ShopHub Logo */}
      <footer className="footer-section bg-dark py-5">
        <div className="container">
          {/* Newsletter Section */}
          <div className="newsletter-section text-center mb-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <h3 className="text-white fw-bold mb-4">Join Our Newsletter</h3>
                <div className="input-group newsletter-form">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Enter your email"
                  />
                  <button className="btn btn-primary px-4" type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {/* Brand Section with ShopHub Logo */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <div className="footer-logo mb-4">
                  <span className="logo-text">
                    Shop<span className="text-primary">Hub</span>
                  </span>
                </div>
                <p className="text-white-50 mb-4">
                  Your ultimate destination for modern shopping. Discover
                  trending fashion, electronics, and lifestyle products all in
                  one place.
                </p>
                <div className="social-links">
                  <button className="btn btn-outline-light btn-floating m-1">
                    <i className="fab fa-facebook-f" />
                  </button>
                  <button className="btn btn-outline-light btn-floating m-1">
                    <i className="fab fa-twitter" />
                  </button>
                  <button className="btn btn-outline-light btn-floating m-1">
                    <i className="fab fa-instagram" />
                  </button>
                  <button className="btn btn-outline-light btn-floating m-1">
                    <i className="fab fa-linkedin-in" />
                  </button>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h5 className="text-white fw-bold mb-4">Quick Links</h5>
                <ul className="list-unstyled footer-links">
                  <li>
                    <Link to="/" className="text-decoration-none">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" className="text-decoration-none">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-decoration-none">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-decoration-none">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-decoration-none">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Customer Service */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h5 className="text-white fw-bold mb-4">Customer Service</h5>
                <ul className="list-unstyled footer-links">
                  <li>
                    <Link to="/account" className="text-decoration-none">
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/track-order" className="text-decoration-none">
                      Track Order
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="text-decoration-none">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns" className="text-decoration-none">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-decoration-none">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h5 className="text-white fw-bold mb-4">Contact Us</h5>
                <div className="contact-info">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marker-alt text-primary me-3" />
                    <p className="text-white-50 mb-0">
                      123 Commerce Street, Business District, City
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-phone text-primary me-3" />
                    <p className="text-white-50 mb-0">+1 234 567 8900</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-envelope text-primary me-3" />
                    <p className="text-white-50 mb-0">support@shophub.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Payment Methods */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="payment-methods text-center">
                <h6 className="text-white-50 mb-3">Accepted Payment Methods</h6>
                <div className="payment-icons">
                  <i className="fab fa-cc-visa mx-2 text-white-50 fs-3" />
                  <i className="fab fa-cc-mastercard mx-2 text-white-50 fs-3" />
                  <i className="fab fa-cc-paypal mx-2 text-white-50 fs-3" />
                  <i className="fab fa-cc-apple-pay mx-2 text-white-50 fs-3" />
                  <i className="fab fa-cc-amazon-pay mx-2 text-white-50 fs-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="footer-bottom mt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <hr className="border-secondary" />
                <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
                  <p className="text-white-50 mb-0">
                    © 2025 ShopHub. All rights reserved.
                  </p>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <Link to="/privacy" className="text-white-50 text-decoration-none">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <span className="text-white-50">•</span>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/terms" className="text-white-50 text-decoration-none">
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;