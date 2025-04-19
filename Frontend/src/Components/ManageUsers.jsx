import React from "react";

const ManageUsers = () => {
  const users = [
    { id: 1, name: "Ali Raza", email: "ali@example.com", role: "Customer" },
    { id: 2, name: "Fatima Noor", email: "fatima@example.com", role: "Admin" },
    { id: 3, name: "Usman Khan", email: "usman@example.com", role: "Customer" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👥 Manage Users</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
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

export default ManageUsers;
