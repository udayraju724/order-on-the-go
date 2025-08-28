import { Admin } from "../models/adminSchema.js";
import { User } from "../models/userSchema.js";
import { Restaurant } from "../models/restaurantSchema.js";

export const updatePromote = async (req, res) => {
      const { promoteList } = req.body;
      try {
        const admin = await Admin.findOne();
        admin.promotedRestaurants = promoteList;
        await admin.save();
        res.json({ message: "approved" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const approveUser =  async (req, res) => {
      const { id } = req.body;
      try {
        const restaurant = await User.findById(id);
        restaurant.approval = "approved";
        await restaurant.save();
        res.json({ message: "approved" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const rejectUser =  async (req, res) => {
      const { id } = req.body;
      try {
        const restaurant = await User.findById(id);
        restaurant.approval = "rejected";
        await restaurant.save();
        res.json({ message: "rejected" });
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const fetchUser =  async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const fetchRestaurant =  async (req, res) => {
      try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

export const fetchUserById = async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }

    
    export const fetchRestaurantDetailsByid = async (req, res) => {
      try {
        const restaurant = await Restaurant.findOne({ ownerId: req.params.id });
        res.json(restaurant);
      } catch (err) {
        res.status(500).json({ message: "Error occured" });
      }
    }
    
    export const fetchPromoteList =  async (req, res) => {
          try {
            const data = await Admin.find();
            if (data.length === 0) {
              const newData = new Admin({
                categories: [],
                promotedRestaurants: [],
              });
              await newData.save();
              return res.json(newData[0].promotedRestaurants);
            } else {
              return res.json(data[0].promotedRestaurants);
            }
          } catch (err) {
            res.status(500).json({ message: "Error occured" });
          }
        }
