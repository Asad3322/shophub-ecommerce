import React, { useEffect, useState } from "react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  // 🔄 Fetch orders from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // 🧹 Delete order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🧾 Manage Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 8).toUpperCase()}</td>
                <td>
                  <strong>{order.user?.name || order.guest?.name || "Unknown"}</strong>
                  <br />
                  {order.guest?.email && (
                    <small className="text-muted">{order.guest.email}</small>
                  )}
                </td>
                <td>
                  <span className={`badge ${getBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  <button className="btn btn-sm btn-info me-2">View</button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🎨 Status badge color helper
const getBadgeClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-warning text-dark";
    case "Shipped":
      return "bg-primary";
    case "Delivered":
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

export default ManageOrders;
