import Product from "../models/Product.js";


export const getProductsPaged = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 9;
        const count = await Product.countDocuments({});
        const products = await Product.find({})
            .skip((page - 1) * parseInt(perPage))
            .limit(parseInt(perPage));
        res.status(200).json({ products, count: Math.ceil(count / perPage) });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        const count = await Product.countDocuments({});
        res.status(200).json({ products, count });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};



export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            category,
            descreption,
            image,
            images,
            price,
            countInStock,
            brand,
            numReviews,
            rating
        } = req.body;
        const newProduct = new Product({
            name,
            slug,
            category,
            descreption,
            image,
            images,
            price,
            countInStock,
            brand,
            numReviews,
            rating
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Post Created", savedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        product.name = req.body.name;
        product.slug = req.body.slug;
        product.category = req.body.category;
        product.descreption = req.body.description;
        product.countInStock = req.body.countInStock;
        product.price = req.body.price;
        product.image = req.body.image;
        product.images = req.body.images;
        await product.save();
        res.status(201).json({ message: "Product Updated" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        await product.remove();
        res.status(201).json({ message: "Product Deleted" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};