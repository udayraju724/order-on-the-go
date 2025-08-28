import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    ownerId: {type: String},
    title: {type: String},
    address: {type: String},
    mainImg: {type: String},
    menu: {type: Array, default: []}
})
export const Restaurant = mongoose.model('restaurant', restaurantSchema);