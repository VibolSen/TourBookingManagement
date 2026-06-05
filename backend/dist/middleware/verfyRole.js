"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = void 0;
const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming req.user is populated after authentication
        if (allowedRoles.includes(userRole)) {
            next();
        }
        else {
            return res.status(403).json({ message: "Access Denied" });
        }
    };
};
exports.verifyRole = verifyRole;
