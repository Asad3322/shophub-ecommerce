import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "PKR",
    description: "",
    category: "",
    tag: "",
    isNewArrival: false, // ✅ New Arrival flag
    isDeal: false,       // ✅ Deal flag
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const formattedPrice = `${form.currency} ${form.price}`;

      formData.append("name", form.name);
      formData.append("price", formattedPrice);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("tag", form.tag);
      formData.append("isNewArrival", form.isNewArrival);
      formData.append("isDeal", form.isDeal);
      formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product submitted!");
      console.log(res.data);
    } catch (error) {
      console.error("❌ Axios error:", error);
      alert("Failed to submit product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>🛍 Add Product</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3 row">
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Currency</label>
            <select className="form-select" name="currency" value={form.currency} onChange={handleChange}>
              <option value="PKR">PKR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <optgroup label="Men">
              <option value="shirts">Shirts</option>
              <option value="jeans">Jeans</option>
              <option value="shoes">Shoes</option>
            </optgroup>
            <optgroup label="Women">
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="beauty">Beauty</option>
            </optgroup>
            <optgroup label="Accessories">
              <option value="watch">Watch</option>
              <option value="wallet">Wallet</option>
              <option value="belt">Belt</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="perfumes">Perfumes</option>
            </optgroup>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input type="text" className="form-control" name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. New, Hot, Trending" />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows="3" value={form.description} onChange={handleChange}></textarea>
        </div>

        {/* ✅ New checkboxes */}
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" id="isNewArrival" name="isNewArrival" checked={form.isNewArrival} onChange={handleChange} />
          <label className="form-check-label" htmlFor="isNewArrival">Mark as New Arrival</label>
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="isDeal" name="isDeal" checked={form.isDeal} onChange={handleChange} />
          <label className="form-check-label" htmlFor="isDeal">Mark as Deal</label>
        </div>

        <button type="submit" className="btn btn-primary">Submit Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
