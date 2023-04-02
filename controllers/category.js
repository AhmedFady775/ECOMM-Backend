import Category from "../models/Categories.js";

export const getCategories = async (req, res) => {
    try {
        const count = await Category.countDocuments({});
        const categories = await Category.find()
        res.status(200).json({ categories, count });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

