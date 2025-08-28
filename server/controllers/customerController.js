import { Orders } from "../models/orderSchema.js";
import { Cart } from "../models/cartSchema.js";
import { Restaurant } from "../models/restaurantSchema.js";

export const fetchCart = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

export const addToCart = async (req, res) => {
  const {
    userId,
    foodItemId,
    foodItemName,
    restaurantId,
    foodItemImg,
    price,
    discount,
    quantity,
  } = req.body;
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    const item = new Cart({
      userId,
      foodItemId,
      foodItemName,
      restaurantId,
      restaurantName: restaurant.title,
      foodItemImg,
      price,
      discount,
      quantity,
    });
    await item.save();

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

export const removeItem = async (req, res) => {
  const { id } = req.body;
  try {
    const item = await Cart.deleteOne({ _id: id });
    res.json({ message: "item removed" });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

export const cancelOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const order = await Orders.findById(id);
    order.orderStatus = "cancelled";
    await order.save();
    res.json({ message: "order cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

export const placeOrder = async (req, res) => {
  const {
    userId,name,
    mobile,email,
    address,pincode,
    paymentMethod,
    orderDate,
  } = req.body;
  try {
    const cartItems = await Cart.find({ userId });
    cartItems.map(async (item) => {
      const newOrder = new Orders({
        userId,name,email,
        mobile,address,
        pincode,
        paymentMethod,
        orderDate,
        restaurantId: item.restaurantId,
        restaurantName: item.restaurantName,
        foodItemId: item.foodItemId,
        foodItemName: item.foodItemName,
        foodItemImg: item.foodItemImg,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
      });
      await newOrder.save();
      await Cart.deleteOne({ _id: item._id });
    });
    res.json({ message: "Order placed" });
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};
