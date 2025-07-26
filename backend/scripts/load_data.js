import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import CsvUser from "../models/csv/CsvUser.js";
import Product from "../models/csv/Product.js";
import InventoryItem from "../models/csv/InventoryItem.js";
import DistributionCenter from "../models/csv/DistributionCenter.js";
import Order from "../models/csv/Order.js";
import OrderItem from "../models/csv/OrderItem.js";

const loadCsvToModel = (filepath, model, transformFn = (data) => data) => {
  return new Promise((resolve, reject) => {
    const items = [];
    fs.createReadStream(filepath)
      .pipe(csvParser())
      .on("data", (row) => {
        items.push(transformFn(row));
      })
      .on("end", async () => {
        try {
          await model.insertMany(items);
          console.log(
            `Inserted ${items.length} documents into ${model.modelName}`
          );
          resolve();
        } catch (error) {
          console.error(
            `Error inserting documents into ${model.modelName}:`,
            error.message
          );
          reject(error);
        }
      });
  });
};

const parseDateFields = (row, fields) => {
  fields.forEach((field) => {
    if (row[field]) {
      row[field] = new Date(row[field]);
    }
  });
  return row;
};

const loadAll = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const basePath = path.join(__dirname, "./data");

  await loadCsvToModel(path.join(basePath, "users.csv"), CsvUser, (row) =>
    parseDateFields(row, ["created_at"])
  );

  await loadCsvToModel(path.join(basePath, "products.csv"), Product);

  await loadCsvToModel(
    path.join(basePath, "inventory_items.csv"),
    InventoryItem,
    (row) => parseDateFields(row, ["created_at", "sold_at"])
  );

  await loadCsvToModel(
    path.join(basePath, "distribution_centers.csv"),
    DistributionCenter
  );

  await loadCsvToModel(path.join(basePath, "orders.csv"), Order, (row) =>
    parseDateFields(row, [
      "created_at",
      "returned_at",
      "shipped_at",
      "delivered_at",
    ])
  );

  await loadCsvToModel(
    path.join(basePath, "order_items.csv"),
    OrderItem,
    (row) =>
      parseDateFields(row, [
        "created_at",
        "returned_at",
        "shipped_at",
        "delivered_at",
      ])
  );

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

loadAll().catch((err) => {
  console.error("Error loading data:", err.message);
  process.exit(1);
});
