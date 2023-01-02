import User from "../models/User.js";


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};



export const RemoveUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        await user.remove();
        res.send({ message: "User Deleted" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};