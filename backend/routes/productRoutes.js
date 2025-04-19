const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getNewArrivals
} = require("../controllers/productController");

// Main product routes
router.post("/", upload.single("image"), addProduct);
router.get("/", getProducts);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

// ✅ New Arrivals route
router.get("/arrivals", getNewArrivals);

module.exports = router;
