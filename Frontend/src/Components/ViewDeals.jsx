import React, { useEffect, useState } from "react";

const ViewDeals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch((err) => console.error("❌ Error fetching deals:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this deal?");
      if (!confirmDelete) return;

      const res = await fetch(`http://localhost:5000/api/deals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeals(deals.filter((deal) => deal._id !== id));
        alert("Deal deleted successfully!");
      } else {
        alert("Failed to delete deal.");
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };

  const getCountdown = (createdAt) => {
    const expireTime = new Date(createdAt).getTime() + 24 * 60 * 60 * 1000; // +24h
    const now = Date.now();
    const remaining = expireTime - now;

    if (remaining <= 0) return "Expired";

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💰 View Deals</h2>

      {deals.length === 0 ? (
        <p>No deals available yet.</p>
      ) : (
        <div className="row">
          {deals.map((deal) => (
            <div className="col-md-4 mb-4" key={deal._id}>
              <div className="card h-100 shadow-sm">
                {deal.image && (
                  <img
                    src={`http://localhost:5000/${deal.image}`}
                    className="card-img-top"
                    alt={deal.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{deal.title}</h5>
                  <p className="card-text">{deal.details}</p>
                  <span className="badge bg-success mb-2">Discount: {deal.discount}%</span>
                  <p className="text-muted">⏳ Expires in: {getCountdown(deal.createdAt)}</p>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => alert("Edit feature coming soon!")}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(deal._id)}
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

export default ViewDeals;
