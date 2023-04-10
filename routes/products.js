const { isAuth, isAdmin } = require("../middleware/auth.js");
const express = require("express");
const { addProduct, getProduct, removeProduct, editProduct, getProductsPaged, getBrands } = require("../controllers/products.js");


const router = express.Router();

router.get("/brands", getBrands)
router.get("/", getProductsPaged)
router.post("/create", isAuth, isAdmin, addProduct)
router.get("/:id", getProduct)
router.delete("/:id", isAuth, isAdmin, removeProduct)
router.put("/:id", isAuth, isAdmin, editProduct)

module.exports = router;
