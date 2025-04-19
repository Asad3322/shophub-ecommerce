import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== id));
      } else {
        alert("Error deleting product.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 display-5 fw-bold text-primary">📦 All Products</h2>

      {products.length === 0 ? (
        <div className="alert alert-info text-center">No products found.</div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4" key={product._id}>
              <div className="card shadow-sm border-0 h-100">
                
                {/* ✅ Image with badge */}
                <div className="position-relative">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "280px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/default-product.jpg")}
                  />
                  {product.tag && (
                    <span
                      className="badge bg-primary position-absolute top-0 start-0 m-2"
                      style={{ fontSize: "0.85rem", padding: "6px 12px", borderRadius: "0.5rem" }}
                    >
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.description}</p>
                    <p className="card-text mb-1">
                      <strong>Price:</strong> Rs {product.price}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {product.category}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={() => handleUpdate(product._id)}
                    >
                      <i className="fas fa-edit me-1" />
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger w-50"
                      onClick={() => handleDelete(product._id)}
                    >
                      <i className="fas fa-trash me-1" />
                      Delete
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

export default ViewProducts;
