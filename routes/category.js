const express = require("express");
const { getCategories, postCategories, getCategory } = require("../controllers/category.js");

const router = express.Router();

router.post("/create", postCategories);
router.get("/", getCategories);
router.get("/name/:name", getCategory);

module.exports = router;