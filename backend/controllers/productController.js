const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// ✅ Add Product with Enhanced Validation & Logging
const addProduct = async (req, res) => {
  try {
    const {
      name = "",
      price = "",
      description = "",
      category = "",
      tag = "",
      isNewArrival,
      isDeal,
    } = req.body;

    // 🧾 Log incoming data
    console.log("📥 Form Data:", req.body);
    console.log("🖼 Uploaded Image:", req.file?.filename);

    // ✅ Trim and validate required fields
    if (!name.trim() || !price.trim() || !category.trim()) {
      return res.status(400).json({
        message: "Name, Price, and Category are required fields",
      });
    }

    // ✅ Validate category
    const validCategories = [
      "shirts", "jeans", "shoes",
      "clothing", "accessories", "beauty",
      "perfumes", "watches", "sunglasses",
      "watch", "wallet", "belt"
    ];

    if (!validCategories.includes(category.trim())) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    // ✅ Handle image
    const image = req.file ? `uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      name: name.trim(),
      price: price.trim(),
      description: description.trim(),
      category: category.trim(),
      tag: tag.trim(),
      image,
      isNewArrival: isNewArrival === "true" || isNewArrival === true,
      isDeal: isDeal === "true" || isDeal === true,
    });

    await newProduct.save();

    const io = req.app.get("io");

    if (newProduct.isNewArrival) {
      io.emit("new-arrival", newProduct);
      console.log("🌟 New arrival emitted:", newProduct.name);
    } else {
      io.emit("new-product", newProduct);
      console.log("🆕 New product emitted:", newProduct.name);
    }

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error in getProducts:", error);
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

// ✅ Update Product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      price,
      description,
      category,
      tag,
      isNewArrival,
      isDeal,
    } = req.body;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      if (existingProduct.image) {
        const oldImagePath = path.join(__dirname, "../", existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      existingProduct.image = `uploads/${req.file.filename}`;
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.description = description || existingProduct.description;
    existingProduct.category = category || existingProduct.category;
    existingProduct.tag = tag || existingProduct.tag;
    existingProduct.isNewArrival = isNewArrival === "true" || false;
    existingProduct.isDeal = isDeal === "true" || false;

    await existingProduct.save();
    res.status(200).json({ message: "Product updated", product: existingProduct });
  } catch (error) {
    console.error("❌ Error in updateProduct:", error);
    res.status(500).json({ message: "Error updating product", error });
  }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = path.join(__dirname, "../", product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteProduct:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// ✅ Get All New Arrivals
const getNewArrivals = async (req, res) => {
  try {
    const arrivals = await Product.find({ isNewArrival: true }).sort({ createdAt: -1 });
    res.status(200).json(arrivals);
  } catch (error) {
    console.error("❌ Error in getNewArrivals:", error);
    res.status(500).json({ message: "Error retrieving arrivals", error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getNewArrivals,
};