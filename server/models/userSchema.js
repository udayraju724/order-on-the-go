import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    usertype: {type: String},
    approval: {type: String}
});
export const User = mongoose.model('users', userSchema);
