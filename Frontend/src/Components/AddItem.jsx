import React, { useState } from "react";

const AddItem = () => {
  const [item, setItem] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Item submitted!");
    // Send item to backend API here
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">➕ Add Product / Service / Deal</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Item Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={item.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={item.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="deal">Deal</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={item.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={item.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit Item</button>
      </form>
    </div>
  );
};

export default AddItem;
