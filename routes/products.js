import { addProduct, getProduct, removeProduct, editProduct, getProducts } from "../controllers/products.js";
import express from "express";

const router = express.Router();

router.get("/", getProducts)
router.post("/create", addProduct)
router.get("/:id", getProduct)
router.delete("/:id", removeProduct)
router.put("/:id", editProduct)

export default router;
