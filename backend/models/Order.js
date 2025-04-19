const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      size: String,
      color: String,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // optional
  guest: {
    name: String,
    email: String,
  },
  totalPrice: Number,
  paymentMethod: { type: String, enum: ["COD", "Card"], default: "COD" },
  status: { type: String, default: "Pending" },
  address: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
