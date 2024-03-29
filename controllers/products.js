const Product = require("../models/Product.js");

const PAGE_SIZE = 9;

const getProductsPaged = async (req, res) => {
    try {
        // const page = req.query.page || 1;
        // const perPage = req.query.perPage || PAGE_SIZE;
        // const sortPrice = req.query.price ? { price: req.query.price } : {};
        // const filterBrand = req.query.brand ? { brand: req.query.brand } : {};
        // const count = await Product.countDocuments({});

        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const price = query.price || '';
        const order = query.order || '';
        const category = req.query.category || '';
        const brand = req.query.brand || '';

        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    price: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};
        const sortOrder =
            order === 'featured'
                ? { featured: -1 }
                : order === 'lowest'
                    ? { price: 1 }
                    : order === 'highest'
                        ? { price: -1 }
                        : order === 'newest'
                            ? { createdAt: -1 }
                            : { _id: -1 };

        const categoryFilter = category && category !== 'all' ? { category } : {};
        const BrandFilter = brand && brand !== 'all' ? { brand } : {};
        const products = await Product.find({
            ...categoryFilter,
            ...priceFilter,
            ...BrandFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...categoryFilter,
            ...priceFilter,
            ...BrandFilter,
        });
        const brands = await Product.find({
            ...categoryFilter,
            ...priceFilter,
            ...BrandFilter,
        }).distinct('brand');
        res.status(200).json({
            brands,
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getBrands = async (req, res) => {
    try {
        const brands = await Product.find().distinct('brand');
        res.status(200).json(brands);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getQueriesPost = async (req, res) => {
    try {
        const page = req.body.page || 1;
        const perPage = req.body.perPage || 9;
        const sortPrice = req.body.price ? { price: req.body.price } : {};
        const filterBrand = req.body.brandFilter ? { brand: { $in: request.body.brandFilter } } : {}
        const count = await Product.countDocuments({});
        const products = await Product.find(filterBrand)
            .skip((page - 1) * parseInt(perPage))
            .limit(parseInt(perPage))
            .sort(sortPrice);
        res.status(200).json({ products, count: Math.ceil(count / perPage) });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { body } = req;
        const newProduct = new Product({
            name: body.name,
            slug: body.slug,
            category: body.category,
            descreption: body.description,
            image: body.image,
            images: body.images,
            price: body.price,
            countInStock: body.countInStock,
            brand: body.brand,
            numReviews: body.numReviews,
            rating: body.rating,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product Created", savedProduct });
    } catch (err) {
        json({ error: err.message });
    }
}


const editProduct = async (req, res) => {
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

const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        await product.remove();
        res.status(201).json({ message: "Product Deleted" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = { editProduct, getProductsPaged, getQueriesPost, getProduct, addProduct, removeProduct, getBrands };
