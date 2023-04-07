import { addProduct, getProduct, removeProduct, editProduct, getProductsPaged, getBrands } from "../controllers/products.js";
import { isAdmin, isAuth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/brands", getBrands)
router.get("/", getProductsPaged)
router.post("/create", isAuth, isAdmin, addProduct)
router.get("/:id", getProduct)
router.delete("/:id", isAuth, isAdmin, removeProduct)
router.put("/:id", isAuth, isAdmin, editProduct)

export default router;
