import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./Navbar.css";
import notificationSound from "../Components/assets/notification.mp3"; // ✅ Sound file

const socket = io("http://localhost:5000");

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Order notification
    socket.on("new-order", (order) => {
      const message = `🛒 New order from ${order.guest?.name || "User"}`;
      setNotifications((prev) => [
        { id: Date.now(), message, time: "Just now" },
        ...prev,
      ]);
    });

    // ✅ Product notification + play sound
    socket.on("new-product", (product) => {
      const message = `🆕 New product added: ${product.name}`;
      setNotifications((prev) => [
        { id: Date.now(), message, time: "Just now" },
        ...prev,
      ]);
      const audio = new Audio(notificationSound);
      audio.play();
    });

    // ✅ Deal notification + play sound
    socket.on("new-deal", (deal) => {
      const message = `🔥 New deal added: ${deal.title || "Untitled Deal"}`;
      setNotifications((prev) => [
        { id: Date.now(), message, time: "Just now" },
        ...prev,
      ]);
      const audio = new Audio(notificationSound);
      audio.play();
    });

    // ✅ Arrival notification + play sound
    socket.on("new-arrival", (arrival) => {
      const message = `🌟 New arrival: ${arrival.name}`;
      setNotifications((prev) => [
        { id: Date.now(), message, time: "Just now" },
        ...prev,
      ]);
      const audio = new Audio(notificationSound);
      audio.play();
    });

    return () => {
      socket.off("new-order");
      socket.off("new-product");
      socket.off("new-deal");
      socket.off("new-arrival");
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeOffcanvas = () => {
    const sidebar = document.getElementById("mobileSidebar");
    const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
    bsOffcanvas?.hide();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-store me-2" />
          ShopHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-start"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileSidebarLabel">
              ShopHub
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={closeOffcanvas}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories" onClick={closeOffcanvas}>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deals" onClick={closeOffcanvas}>
                  Deals
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-arrivals" onClick={closeOffcanvas}>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="collapse navbar-collapse justify-content-end">
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control search-box"
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-light ms-2" type="submit">
              <i className="fas fa-search" />
            </button>
          </form>

          <div className="d-flex align-items-center gap-3">
            <div
              className="nav-link position-relative"
              style={{ cursor: "pointer" }}
              onClick={() => setShowNotifications(!showNotifications)}
              ref={notificationRef}
            >
              <i className="fas fa-bell fa-lg" />
              {notifications.length > 0 && (
                <span className="icon-badge">{notifications.length}</span>
              )}

              {showNotifications && (
                <div className="notification-dropdown">
                  {notifications.map((note) => (
                    <div key={note.id} className="notification-item">
                      <p>{note.message}</p>
                      <span className="time">{note.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link className="nav-link" to="/favorites">
              <i className="fas fa-heart fa-lg" />
            </Link>
            <Link className="nav-link position-relative" to="/cart">
              <i className="fas fa-shopping-cart fa-lg" />
              <span className="icon-badge">2</span>
            </Link>
            <Link className="nav-link" to="/profile">
              <i className="fas fa-user-circle fa-lg" />
            </Link>

            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>
            <Link className="btn btn-light text-primary" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;