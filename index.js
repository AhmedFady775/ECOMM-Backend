const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { register } = require("./controllers/auth.js")
const authRoutes = require("./routes/auth.js")
const usersRoutes = require("./routes/users.js")
const productsRoutes = require("./routes/products.js")
const orderRouters = require("./routes/order.js")
const CategoriesRouters = require("./routes/category.js")
const uploadRouter = require("./routes/upload.js")


/* DEFAULT SETTINGS */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())




/* ROUTES */
app.post("/auth/register", register)
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/products", productsRoutes)
app.use("/orders", orderRouters)
app.use("/categories", CategoriesRouters)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', uploadRouter);




const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        console.log("connected to Mongo");
        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));