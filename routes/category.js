import express from "express";
import { getCategories, postCategories, getCategory } from "../controllers/category.js";

const router = express.Router();

router.post("/create", postCategories);
router.get("/", getCategories);
router.get("/name/:name", getCategory);



export default router;