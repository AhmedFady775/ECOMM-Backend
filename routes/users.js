import { getUser, RemoveUser } from "../controllers/user.js"
import express from "express";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", isAuth, getUser);
router.delete("/:id", isAuth, RemoveUser);


export default router;