const Deal = require("../models/Deal");

// ✅ Add Deal
const addDeal = async (req, res) => {
  try {
    const { title, discount, details } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : "";

    const newDeal = new Deal({ title, discount, details, image });
    await newDeal.save();

    const io = req.app.get("io");
    console.log("🔥 Emitting new-deal:", newDeal.title); // ✅ Log for debug
    io.emit("new-deal", newDeal); // 🔔 Emit new deal notification

    res.status(201).json({ message: "Deal added successfully", deal: newDeal });
  } catch (error) {
    console.error("Error adding deal:", error);
    res.status(500).json({ message: "Failed to add deal", error });
  }
};

// ✅ Get All Deals
const getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ message: "Failed to fetch deals", error });
  }
};

module.exports = {
  addDeal,
  getAllDeals,
};
