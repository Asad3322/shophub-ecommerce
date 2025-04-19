const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./utils/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const dealRoutes = require("./routes/dealRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // ✅ create HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ your frontend origin
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

// 🔌 Handle Socket.IO connection
io.on("connection", (socket) => {
  console.log("🟢 A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 A client disconnected:", socket.id);
  });
});

// Make io accessible in controllers
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());

// Uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/orders", orderRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🛍️ Ecommerce API Running");
});

// Start server using HTTP server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
