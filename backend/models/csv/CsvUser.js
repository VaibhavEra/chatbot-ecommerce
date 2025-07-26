import mongoose from "mongoose";

const csvUserSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  gender: String,
  state: String,
  street_address: String,
  postal_code: String,
  city: String,
  country: String,
  latitude: Number,
  longitude: Number,
  traffic_source: String,
  created_At: Date,
});

export default mongoose.models.CsvUser ||
  mongoose.model("CsvUser", csvUserSchema);
