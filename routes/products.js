import { addProduct, getProduct, removeProduct, editProduct, getProducts, getProductsPaged } from "../controllers/products.js";
import { isAdmin, isAuth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/allproducts", getProducts)
router.get("/", getProductsPaged)
router.post("/create", addProduct)
router.get("/:id", getProduct)
router.delete("/:id", isAuth, isAdmin, removeProduct)
router.put("/:id", isAuth, isAdmin, editProduct)

export default router;
