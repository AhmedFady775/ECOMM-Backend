import { addProduct, getProduct, removeProduct, editProduct, getProducts } from "../controllers/products.js";
import { isAdmin, isAuth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/", isAuth, getProducts)
router.post("/create", isAuth, isAdmin, addProduct)
router.get("/:id", isAuth, getProduct)
router.delete("/:id", isAuth, isAdmin, removeProduct)
router.put("/:id", isAuth, isAdmin, editProduct)

export default router;
