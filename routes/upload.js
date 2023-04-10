
const express = require("express");
const multer = require("multer");
const { isAuth, isAdmin } = require("../middleware/auth.js");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}`);
    },
});

const upload = multer({ storage });
const router = express.Router();

router.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res.status(201).send({ image: `/${req.file.path}` });
});
module.exports = router;



