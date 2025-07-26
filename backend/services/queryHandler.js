import CsvUser from "../models/csv/CsvUser.js";
import Product from "../models/csv/Product.js";
import InventoryItem from "../models/csv/InventoryItem.js";
import DistributionCenter from "../models/csv/DistributionCenter.js";
import Order from "../models/csv/Order.js";
import OrderItem from "../models/csv/OrderItem.js";

const modelMap = {
  users: CsvUser,
  products: Product,
  inventory_items: InventoryItem,
  distribution_centers: DistributionCenter,
  orders: Order,
  order_items: OrderItem,
};

/**
 * Executes a MongoDB query based on the LLM response structure
 * @param {{ collection: string, filter: object }} params
 * @returns {Promise<Array>}
 */
export const handleQuery = async ({ collection, filter }) => {
  const model = modelMap[collection];
  if (!model) throw new Error(`Unknown collection: ${collection}`);

  return await model.find(filter).limit(5); // Safe query limit
};
