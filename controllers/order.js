import Order from "../models/Order.js";
import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";


export const summary = expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: { $sum: 1 },
                totalSales: { $sum: "$totalPrice" },
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            },
        },
    ]);
    const dailyOrders = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                orders: { $sum: 1 },
                sales: { $sum: "$totalPrice" },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    res.send({ users, orders, dailyOrders });
})

export const addOrder = async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
}

export const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
}

export const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}







