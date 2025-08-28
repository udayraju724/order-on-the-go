import {
  addToCart,
  cancelOrder,
  fetchCart,
  placeOrder,
  removeItem,
} from "../controllers/customerController.js";
import express from "express";
const Router = express.Router();

import { authenticateToken } from "../middleware/authMiddleware.js";
Router.use(authenticateToken);

Router.put("/cancel-order", cancelOrder);
Router.get("/fetch-cart", fetchCart);
Router.post("/add-to-cart", addToCart);
Router.put("/remove-item", removeItem);
Router.post("/place-cart-order", placeOrder);

export default Router;
