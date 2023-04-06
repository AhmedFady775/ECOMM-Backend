import express from "express";
import { getCategories, postCategories } from "../controllers/category.js";

const router = express.Router();

router.post("/create", postCategories);
router.get("/", getCategories);


export default router;