import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



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


export const editUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: jwt.sign(
                {
                    _id: updatedUser._id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "3d",
                }
            ),
        });
    } else {
        res.status(404).send({ message: "User not found" });
    }
}


