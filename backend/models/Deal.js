const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  discount: { type: Number, required: true },
  details: { type: String },
  image: { type: String }, // path to uploaded image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Deal", dealSchema);
