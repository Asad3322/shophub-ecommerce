import React, { useState } from "react";

const AddArrival = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    tag: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append("isNewArrival", true);

    // ✅ Debug log to confirm what's being submitted
    console.log("📤 Submitting form data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("New Arrival added successfully!");
        setForm({ name: "", price: "", description: "", category: "", tag: "", image: null });
        setPreview(null);
      } else {
        alert(data.message || "Error adding arrival");
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">✨ Add New Arrival</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 border rounded bg-light shadow">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="shirts">Shirts</option>
            <option value="jeans">Jeans</option>
            <option value="shoes">Shoes</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="beauty">Beauty</option>
            <option value="perfumes">Perfumes</option>
            <option value="watches">Watches</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="watch">Watch</option>
            <option value="wallet">Wallet</option>
            <option value="belt">Belt</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            name="tag"
            value={form.tag}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {preview && (
          <div className="mb-3 text-center">
            <img
              src={preview}
              alt="Preview"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              className="rounded shadow"
            />
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          Add Arrival
        </button>
      </form>
    </div>
  );
};

export default AddArrival;
