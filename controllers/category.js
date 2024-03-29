const Category = require("../models/Categories.js");

const getCategories = async (req, res) => {
    try {
        const count = await Category.countDocuments({});
        const categories = await Category.find()
        res.status(200).json({ categories, count });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.name });
        res.status(200).json(category);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


const postCategories = async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            brands: req.body.brands,
        });
        const category = await newCategory.save();
        res.status(200).json(category);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = { getCategories, getCategory, postCategories };
