import {
  addProduct,
  fetchCategory,
  fetchRestaurantId,
  fetchItemDetails,
  fetchItems,
  fetchOrders,
  updateProduct,
  updateOrderStatus,
} from "../controllers/restaurantController.js";
import express from "express";
const Router = express.Router();

// import { authenticateToken } from "../middleware/authMiddleware.js";
// Router.use(authenticateToken);

Router.get("/fetch-orders", fetchOrders);
Router.get("/fetch-items", fetchItems);
Router.get("/fetch-categories", fetchCategory);
Router.get("/fetch-item-details/:id", fetchItemDetails);
Router.get("/fetch-restaurant/:id", fetchRestaurantId);
Router.post("/add-new-product", addProduct);
Router.put("/update-product/:id", updateProduct);
Router.put("/update-order-status", updateOrderStatus);

export default Router;
