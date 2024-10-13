import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    points:{
        type: Number,
        default: 0
    }
})

export const User = mongoose.model("User", userSchema);