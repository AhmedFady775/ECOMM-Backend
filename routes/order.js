import express from "express";
import { getOrder, getOrders, addOrder, getMyOrders, summary } from "../controllers/order.js";
import { isAdmin, isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", isAuth, isAdmin, summary)
router.get("/", isAuth, isAdmin, getOrders)
router.get("/mine", isAuth, getMyOrders)
router.post("/create", isAuth, addOrder)
router.get("/:id", isAuth, getOrder)


export default router;