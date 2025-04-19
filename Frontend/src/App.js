import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Cateogiespage from "./Pages/Cateogiespage";
import Dealspage from "./Pages/Dealspage";
import Newarrivalspage from "./Pages/Newarrivalspage";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Signuppage";
import WomensFashion from "./Components/WomensFashion";
import MensFashion from "./Components/MensFashion";
import MensAccessories from "./Components/MensAccessories";
import Favorites from "./Components/Favorites";
import Profile from "./Components/Profile";
import SearchResults from "./Components/SearchResults";
import CartPage from "./Pages/CartPage";
import AdminDashboard from "./Components/AdminDashboard";

// 🔥 Admin Panel Pages
import AddProduct from "./Components/AddProduct";
import ViewProducts from "./Components/ViewProducts";
import AddDeal from "./Components/AddDeal";
import ViewDeals from "./Components/ViewDeals";
import ManageOrders from "./Components/ManageOrders";
import AddArrival from "./Components/AddArrival";
import ViewArrivals from "./Components/ViewArrivals";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Cateogiespage />} />
        <Route path="/deals" element={<Dealspage />} />
        <Route path="/new-arrivals" element={<Newarrivalspage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/categories/womens-fashion" element={<WomensFashion />} />
        <Route path="/categories/mens-collection" element={<MensFashion />} />
        <Route path="/categories/mens-accessories" element={<MensAccessories />} />
        <Route path="/categories/accessories" element={<MensAccessories />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ Admin Dashboard and Management Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/view-products" element={<ViewProducts />} />
        <Route path="/add-deal" element={<AddDeal />} />
        <Route path="/view-deals" element={<ViewDeals />} />
        <Route path="/add-arrival" element={<AddArrival />} />
        <Route path="/view-arrivals" element={<ViewArrivals />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
