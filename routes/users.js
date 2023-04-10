const express = require("express");
const { isAdmin, isAuth } = require("../middleware/auth.js");
const { getUser, RemoveUser, getUsers, editUser } = require("../controllers/user.js")

const router = express.Router();

router.get("/", isAuth, isAdmin, getUsers);
router.get("/:id", isAuth, getUser);
router.put("/edit", isAuth, editUser);
router.delete("/:id", isAuth, RemoveUser);


module.exports = router;
