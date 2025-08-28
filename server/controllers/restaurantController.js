import { Orders } from "../models/orderSchema.js";
import { FoodItem } from "../models/foodItemSchema.js";
import { Admin } from "../models/adminSchema.js";
import { Restaurant } from "../models/restaurantSchema.js";

export const fetchOrders =async (req, res) => {
      try {
        const orders = await Orders.find();
        res.json(orders);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const fetchItems =  async (req, res) => {
      try {
        const items = await FoodItem.find();
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const fetchCategory =  async (req, res) => {
      try {
        const data = await Admin.find();
        if (data.length === 0) {
          const newData = new Admin({
            categories: [],
            promotedRestaurants: [],
          });
          await newData.save();
          return res.json(newData[0].categories);
        } else {
          return res.json(data[0].categories);
        }
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const fetchItemDetails = async (req, res) => {
      try {
        const item = await FoodItem.findById(req.params.id);
        res.json(item);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

    export const fetchRestaurantId = async (req, res) => {
      try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const addProduct =  async (req, res) => {
      const {
        restaurantId,productName,
        productDescription,
        productMainImg,productCategory,
        productMenuCategory,productNewCategory,
        productPrice,productDiscount,
      } = req.body;
      try {
        if (productMenuCategory === "new category") {
          const admin = await Admin.findOne();
          admin.categories.push(productNewCategory);
          await admin.save();
          const newProduct = new FoodItem({
            restaurantId,
            title: productName,
            description: productDescription,
            itemImg: productMainImg,
            category: productCategory,
            menuCategory: productNewCategory,
            price: productPrice,
            discount: productDiscount,
            rating: 0,
          });
          await newProduct.save();
          const restaurant = await Restaurant.findById(restaurantId);
          restaurant.menu.push(productNewCategory);
          await restaurant.save();
        } else {
          const newProduct = new FoodItem({
            restaurantId,
            title: productName,
            description: productDescription,
            itemImg: productMainImg,
            category: productCategory,
            menuCategory: productMenuCategory,
            price: productPrice,
            discount: productDiscount,
            rating: 0,
          });
          await newProduct.save();
        }
        res.json({ message: "product added!!" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const updateProduct = async (req, res) => {
      const {
        restaurantId,
        productName,
        productDescription,
        productMainImg,
        productCategory,
        productMenuCategory,
        productNewCategory,
        productPrice,
        productDiscount,
      } = req.body;
      try {
        if (productCategory === "new category") {
          const admin = await Admin.findOne();
          admin.categories.push(productNewCategory);
          await admin.save();
          
          const product = await FoodItem.findById(req.params.id);
          product.title = productName;
          product.description = productDescription;
          product.itemImg = productMainImg;
          product.category = productCategory;
          product.menuCategory = productNewCategory;
          product.price = productPrice;
          product.discount = productDiscount;

          await product.save();
        } else {
          const product = await FoodItem.findById(req.params.id);
          
          product.title = productName;
          product.description = productDescription;
          product.itemImg = productMainImg;
          product.category = productCategory;
          product.menuCategory = productMenuCategory;
          product.price = productPrice;
          product.discount = productDiscount;
          
          await product.save();
        }
        res.json({ message: "product updated!!" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const updateOrderStatus = async (req, res) => {
      const { id, updateStatus } = req.body;
      try {
        const order = await Orders.findById(id);
        order.orderStatus = updateStatus;
        await order.save();
        res.json({ message: "order status updated" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }