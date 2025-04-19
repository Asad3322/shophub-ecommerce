import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // ✅ import Link
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.fullName,
        email: form.email,
        password: form.password,
      };
      const res = await axios.post("http://localhost:5000/api/auth/signup", payload);
      toast.success(res.data.message || "Signup successful!");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed!";
      toast.error(message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label className="terms">
          <input type="checkbox" required /> I accept terms & conditions
        </label>
        <button type="submit" className="auth-btn">Signup</button>
        <div className="toggle-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
