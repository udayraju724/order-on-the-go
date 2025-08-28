import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors("http://localhost:3000"));
app.use(authRoutes,adminRoutes,restaurantRoutes,customerRoutes)


mongoose
  .connect("mongodb://localhost:27017/foodDelivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db')
     })
  .catch((e) => console.log(`Error in db connection ${e}`));

  app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`)
    });
    
 