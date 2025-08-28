import { User } from "../models/userSchema.js";
import { Restaurant } from "../models/restaurantSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const {
    username, email,usertype,password,
    restaurantAddress,restaurantImage,
  } = req.body;
  if (!username || !email || !password || !usertype) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (usertype === "restaurant") {
    if (!restaurantAddress || !restaurantImage) {
      return res
        .status(400)
        .json({
          message:
            "Restaurant address and image are required for restaurant users.",
        });
    }
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,email,usertype,password: hashedPassword,
      approval: usertype === "restaurant" ? "pending" : "approved",
    });
    const savedUser = await newUser.save();
    if (usertype === "restaurant") {
      const restaurant = new Restaurant({
        ownerId: savedUser._id,
        title: username,
        address: restaurantAddress,
        mainImg: restaurantImage,
        menu: [],
      });
      await restaurant.save();
    }
    const token = jwt.sign(
      {
        id: savedUser._id,usertype: savedUser.usertype,
        email: savedUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      token,
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      usertype: savedUser.usertype,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, usertype: user.usertype, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      _id: user._id,
      email: user.email,
      usertype: user.usertype,
      username: user.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
