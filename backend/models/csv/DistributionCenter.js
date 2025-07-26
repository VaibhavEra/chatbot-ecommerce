import mongoose from "mongoose";

const distributionCenterSchema = new mongoose.Schema({
  id: Number,
  name: String,
  latitude: Number,
  longitude: Number,
});

export default mongoose.model.DistributionCenter ||
  mongoose.model("DistributionCenter", distributionCenterSchema);
