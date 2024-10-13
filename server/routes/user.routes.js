import { Router } from "express";
import { claimPoints, createUser, leaderBoard, userList } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(userList);
router.route("/claim").post(claimPoints);
router.route("/create").post(createUser);
router.route("/leaderboard").get(leaderBoard);

export default router;
