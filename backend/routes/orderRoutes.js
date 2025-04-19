const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.addOrder);
router.get("/", orderController.getAllOrders);
router.put("/:id/status", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder); // ✅ Added route

module.exports = router;
