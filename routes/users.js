import { getUser, RemoveUser, getUsers, editUser } from "../controllers/user.js"
import express from "express";
import { isAdmin, isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuth, isAdmin, getUsers);
router.get("/:id", isAuth, getUser);
router.put("/edit", isAuth, editUser);
router.delete("/:id", isAuth, RemoveUser);



export default router;