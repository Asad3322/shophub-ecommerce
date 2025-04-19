const Order = require("../models/Order");
const Product = require("../models/Product");

// ✅ Add Order
exports.addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    // ✅ Emit real-time event to all connected clients
    const io = req.app.get("io");
    io.emit("new-order", newOrder); // 🔔 notify clients

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error in addOrder:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// ✅ Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: "Status updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// ✅ Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting order:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// ✅ Add Product with Notification Emit
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category, tag } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : "";

    const newProduct = new Product({ name, price, description, category, tag, image });
    await newProduct.save();

    const io = req.app.get("io");
    io.emit("new-product", newProduct); // 🔔 notify clients of new product

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};
