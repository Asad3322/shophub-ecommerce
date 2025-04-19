const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    category: {
      type: String,
      enum: [
        "shirts", "jeans", "shoes",
        "clothing", "accessories", "beauty",
        "perfumes", "watches", "sunglasses",
        "watch", "wallet", "belt"
      ],
      required: true,
    },
    tag: { type: String },
    isNewArrival: { type: Boolean, default: false },
    isDeal: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
