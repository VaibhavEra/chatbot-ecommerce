import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  created_at: Date,
  sold_at: Date,
  cost: Number,
  product_category: String,
  product_name: String,
  product_retail_price: Number,
  product_department: String,
  product_sku: String,
  product_distribution_center_id: Number,
});

export default mongoose.models.InventoryItem ||
  mongoose.model("InventoryItem", inventoryItemSchema);
