import React, { useEffect, useState } from "react";

const ViewArrivals = () => {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/arrivals"); // ✅ updated endpoint
        const data = await res.json();
        setArrivals(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch arrivals:", error);
        setLoading(false);
      }
    };

    fetchArrivals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArrivals(arrivals.filter((item) => item._id !== id));
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading)
    return <div className="text-center mt-5">Loading arrivals...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary text-center fw-bold lobster">
        ✨ New Arrivals
      </h2>
      {arrivals.length === 0 ? (
        <p className="text-center">No new arrivals found.</p>
      ) : (
        <div className="row">
          {arrivals.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card shadow h-100 border-0 rounded-4">
                {product.image && (
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    className="card-img-top rounded-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">
                    {product.name}
                  </h5>
                  <p className="card-text text-muted small">
                    {product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-success fw-bold">
                      ${product.price}
                    </span>
                    <span className="badge bg-secondary text-capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      onClick={() => alert("Edit functionality coming soon!")}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      onClick={() => handleDelete(product._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewArrivals;
