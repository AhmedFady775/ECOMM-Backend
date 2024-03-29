const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

/* REGISTER USER */
// export const register = async (req, res) => {
//     try {
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             picturePath,
//         } = req.body;

//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: passwordHash,
//             picturePath,
//         });

//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// /* LOGGING IN */
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) return res.status(400).json({ msg: "User does not exist. " });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         delete user.password;
//         res.status(200).json({ token, user });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: jwt.sign(
                    {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "3d",
                    }
                ),
            });
            return;
        }
    }
    res.status(401).send({ message: "Invalid email or password" });
}


const register = async (req, res) => {
    const salt = await bcrypt.genSalt();

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: false,
        password: bcrypt.hashSync(req.body.password, salt),
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d",
            }
        )
    });
}

module.exports = { register, login };
