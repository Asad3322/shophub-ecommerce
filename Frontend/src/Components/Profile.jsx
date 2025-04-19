import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")); // or get from auth context

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Profile</h2>

      {user ? (
        <div className="card p-4 shadow">
          <h5>Name: {user.name}</h5>
          <p>Email: {user.email}</p>

          <button className="btn btn-primary mt-3">Edit Profile</button>
          <button className="btn btn-danger mt-3 ms-2">Logout</button>
        </div>
      ) : (
        <p className="text-center">Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
