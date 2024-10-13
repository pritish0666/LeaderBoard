import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  pointsAwarded: {
    type: Number,
  },
});

export const Point = mongoose.model("Point", pointSchema);
