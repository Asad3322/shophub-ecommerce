import React from "react";

const ManageProducts = () => {
  // Sample product data
  const products = [
    { id: 1, name: "Stylish Jacket", price: "$120", stock: 10 },
    { id: 2, name: "Elegant Watch", price: "$250", stock: 5 },
    { id: 3, name: "Running Shoes", price: "$80", stock: 15 },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Manage Products</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
