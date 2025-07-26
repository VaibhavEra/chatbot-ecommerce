import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  cost: Number,
  category: String,
  name: String,
  brand: String,
  retail_price: Number,
  department: String,
  sku: String,
  distribution_center_id: Number,
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
