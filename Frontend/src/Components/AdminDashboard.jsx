import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import profileImg from "../Components/assets/Asad.jpg";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeSidebarMenu = () => {
    const collapseMenu = document.getElementById("menuCollapse");
    const bsCollapse = window.bootstrap?.Collapse.getInstance(collapseMenu);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white sidebar p-4 shadow d-flex flex-column justify-content-between">
          <div>
            <div className="text-center mb-4">
              <img
                src={profileImg}
                alt="Admin"
                className="img-fluid rounded-circle mb-3 shadow"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h4 className="lobster text-shadow">ShopHub Admin</h4>
            </div>

            {/* Accordion Menu */}
            <div className="accordion" id="adminAccordion">
              <div className="accordion-item bg-dark border-0">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed bg-dark text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuCollapse"
                    aria-expanded="false"
                    aria-controls="menuCollapse"
                  >
                    📂 Menu
                  </button>
                </h2>
                <div
                  id="menuCollapse"
                  className="accordion-collapse collapse"
                  data-bs-parent="#adminAccordion"
                >
                  <div className="accordion-body p-0">
                    <ul className="nav flex-column sidebar-menu">
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/admin" onClick={closeSidebarMenu}>
                          🏠 Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/add-product" onClick={closeSidebarMenu}>
                          🛍 Add Product
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/view-products" onClick={closeSidebarMenu}>
                          📦 View Products
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/add-deal" onClick={closeSidebarMenu}>
                          💸 Add Deal
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/view-deals" onClick={closeSidebarMenu}>
                          💰 View Deals
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/add-arrival" onClick={closeSidebarMenu}>
                          ✨ Add Arrival
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/view-arrivals" onClick={closeSidebarMenu}>
                          👁 View Arrivals
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/manage-orders" onClick={closeSidebarMenu}>
                          📑 Manage Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center mt-4">
            <button className="btn btn-outline-light w-100" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-5 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-4 mb-3 lobster text-shadow">
            Welcome to ShopHub Admin Panel
          </h1>
          <p className="lead text-muted">
            Manage your ecommerce platform effortlessly — products, orders, users, and more.
          </p>
          <img
            src="https://img.freepik.com/free-vector/dashboard-concept-illustration_114360-2587.jpg"
            alt="Dashboard"
            className="img-fluid mt-4"
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;