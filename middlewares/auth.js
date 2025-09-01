import jwt from "jsonwebtoken";

let verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: "Authentication failed",
                data: null,
                error: "No token provided",
            });
        }

        token = token.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Authentication failed",
                    data: null,
                    error: "JWT expired",
                });
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message,
        });
    }
};


const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Forbidden",
            data: null,
            error: "You do not have permission to perform this action",
        });
    }
    next();
}

export { verifyToken, verifyAdmin };
