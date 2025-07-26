import { create } from "domain";
import { stat } from "fs";
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  id: Number,
  order_id: Number,
  product_id: Number,
  inventory_item_id: Number,
  status: String,
  created_at: Date,
  shipped_at: Date,
  delivered_at: Date,
  returned_at: Date,
});

export default mongoose.models.OrderItem ||
  mongoose.model("OrderItem", orderItemSchema);
