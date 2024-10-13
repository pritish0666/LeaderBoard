import { User } from "../models/user.model.js";
import { Point } from "../models/points.model.js";

const userList = async (req,res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    throw new Error(error.message);
  }
};

const claimPoints = async (req,res) => {
  try {
    const { userId, points } = req.body;
    console.log(userId, points);
    const user = await User.findById(userId);
    console.log(user);
    const userPoints = user.points + points;
    console.log(userPoints);
    await User.findByIdAndUpdate(userId, { points: userPoints });

    await user.save();
    await Point.create({ pointsAwarded: points });
    return res.status(201).json({ message: "Points claimed" }).json(user);
  } catch (error) {
    console.log("error while claiming points", error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, points } = req.body;
    const user = await User.create({ name, points });
    return res.status(201).json(user);
  } catch (error) {
    console.log("error while creating user", error.message);
  }
};

const leaderBoard = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    return res.status(200).json(users);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { userList, claimPoints, createUser,leaderBoard };
