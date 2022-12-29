import express from "express";
import { getOrder, getOrders, addOrder } from "../controllers/order.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getOrders)
router.post("/create", isAuth, addOrder)
router.get("/:id", getOrder)



export default router;