// ✅ Updated CartForm.jsx with double-submit prevention and debug logging
import React, { useState } from "react";
import "./CartForm.css";

const CartForm = ({ product, onClose }) => {
  const resolvedProduct = product || {};

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(resolvedProduct.colors?.[0] || "#000");
  const [selectedSize, setSelectedSize] = useState(resolvedProduct.size || "M");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const orderData = {
      guest: {
        name: userInfo.name,
        email: userInfo.email,
      },
      products: [
        {
          productId: resolvedProduct._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        },
      ],
      totalPrice: resolvedProduct.price * quantity,
      paymentMethod: "COD",
      address: userInfo.address,
    };

    console.log("🛒 Submitting order:", orderData);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("🎉 Order placed successfully!");
        if (typeof onClose === "function") {
          onClose();
        }
      } else {
        alert("❌ Failed to place order");
        console.error(result.message);
      }
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSizeOptions = ["clothing", "t-shirts", "jeans", "shoes"].includes(
    resolvedProduct.category?.toLowerCase()
  );

  return (
    <div className="cart-form-overlay">
      <div className="cart-form-wrapper">
        <div className="cart-card">
          {onClose && (
            <button className="close-cart-form" onClick={onClose}>
              &times;
            </button>
          )}

          <div className="cart-image-section">
            <img
              src={
                resolvedProduct.image?.startsWith("http") ||
                resolvedProduct.image?.startsWith("/static/")
                  ? resolvedProduct.image
                  : `http://localhost:5000/${resolvedProduct.image}`
              }
              alt={resolvedProduct.name || "Product"}
              className="cart-product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-product.jpg";
              }}
            />
          </div>

          <div className="cart-form-section">
            <h2 className="cart-title">Checkout</h2>
            <h4 className="cart-product-name">{resolvedProduct.name}</h4>
            <p className="cart-price">Price: {resolvedProduct.price}</p>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="2"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {resolvedProduct.colors?.length > 0 && (
                <div className="form-group">
                  <label>Choose Color</label>
                  <div className="color-options">
                    {resolvedProduct.colors.map((color, index) => (
                      <button
                        type="button"
                        key={index}
                        className={`color-circle ${selectedColor === color ? "active" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {showSizeOptions && (
                <div className="form-group">
                  <label>Select Size</label>
                  <select
                    className="form-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {["S", "M", "L", "XL"].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="cod-option">
                  <input type="radio" id="cod" name="payment" checked readOnly />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : "Confirm Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartForm;