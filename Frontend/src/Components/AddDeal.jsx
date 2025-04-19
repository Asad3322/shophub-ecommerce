import React, { useState } from "react";

const AddDeal = () => {
  const [deal, setDeal] = useState({
    title: "",
    discount: "",
    details: "",
    image: null,
  });

  const handleChange = (e) => {
    setDeal({ ...deal, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setDeal({ ...deal, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", deal.title);
    formData.append("discount", deal.discount);
    formData.append("details", deal.details);
    if (deal.image) {
      formData.append("image", deal.image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/deals/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Deal added successfully!");
        setDeal({ title: "", discount: "", details: "", image: null });
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting deal:", error);
      alert("❌ Failed to submit deal.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>💸 Add Deal</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Deal Title</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Discount (%)</label>
          <input type="number" className="form-control" name="discount" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Details</label>
          <textarea className="form-control" name="details" rows="3" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Deal Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-primary">Add Deal</button>
      </form>
    </div>
  );
};

export default AddDeal;
