const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { addDeal, getAllDeals } = require("../controllers/dealController");
const Deal = require("../models/Deal"); // ✅ Needed for delete logic

// ✅ Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ POST: Add a new deal
router.post("/add", upload.single("image"), addDeal);

// ✅ GET: Get all deals
router.get("/", getAllDeals);

// ✅ DELETE: Delete a deal by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Deal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Deal not found" });

    res.json({ message: "Deal deleted successfully" });
  } catch (err) {
    console.error("Error deleting deal:", err);
    res.status(500).json({ message: "Failed to delete deal", error: err });
  }
});

module.exports = router;
