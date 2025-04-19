import React, { useState } from "react";

const AddService = () => {
  const [service, setService] = useState({ name: "", duration: "", description: "" });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Service added!");
  };

  return (
    <div className="container mt-4">
      <h2>🧰 Add Service</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label className="form-label">Service Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (e.g., 30 min)</label>
          <input type="text" className="form-control" name="duration" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows="3" onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
