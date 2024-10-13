import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("All good.");
});

app.use("/users", userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
