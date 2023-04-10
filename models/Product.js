const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        images: {
            type: Array,
            default: "",
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        descreption: {
            type: String,
            required: true,
        },
        countInStock: { type: Number, required: true },
        rating: {
            type: Number, default: "",
        },
        numReviews: {
            type: Number, default: "",
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;