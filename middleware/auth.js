import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//     try {
//         let token = req.header("Authorization");

//         if (!token) {
//             return res.status(403).send("Access Denied");
//         }

//         if (token.startsWith("Bearer ")) {
//             token = token.slice(7, token.length).trimLeft();
//         }

//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid Token" });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "No Token" });
    }
};
