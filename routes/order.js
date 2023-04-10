const express = require("express");
const { getOrder, getOrders, addOrder, getMyOrders, summary } = require("../controllers/order.js");
const { isAdmin, isAuth } = require("../middleware/auth.js");

const router = express.Router();

router.get("/summary", isAuth, isAdmin, summary)
router.get("/", isAuth, isAdmin, getOrders)
router.get("/mine", isAuth, getMyOrders)
router.post("/create", isAuth, addOrder)
router.get("/:id", isAuth, getOrder)


module.exports = router;
