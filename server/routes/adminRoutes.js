import { approveUser, fetchPromoteList, fetchRestaurant, fetchRestaurantDetailsByid, fetchUser, fetchUserById, rejectUser, updatePromote } from "../controllers/adminController.js";
import express from "express"
const Router = express.Router()

// import { authenticateToken } from "../middleware/authMiddleware.js";
// Router.use(authenticateToken); // Protect all routes below

Router.post("/update-promote-list",updatePromote)
Router.post("/approve-user",approveUser)
Router.post("/reject-user",rejectUser)
Router.get("/fetch-users",fetchUser)
Router.get("/fetch-restaurants",fetchRestaurant)
Router.get("/fetch-user-details/:id",fetchUserById)
Router.get("/fetch-promoted-list",fetchPromoteList)
Router.get("/fetch-restaurant-details/:id",fetchRestaurantDetailsByid)

export default Router