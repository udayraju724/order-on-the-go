import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    categories: {type: Array},
    promotedRestaurants: []
});

export const Admin = mongoose.model('admin', adminSchema);
