const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({
                message: "No token"
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};