// import express from "express";
// import { authenticateToken } from "../middleware/authenticateToken.js";
// import { authenticate } from "../middleware/authenticate.js";

// const router = express.Router();

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };

// router.get(
//   "/admin",
//   authenticateToken,
//   authorizeRoles("admin"), // Only accessible to users with "admin" role
//   (req, res) => {
//     res.json({ message: "Welcome admin", user: req.user });
//   }
// );

// router.get(
//   "/sub-admin",
//   authenticate,
//   authorizeRoles("sub-admin", "admin"), // Accessible to "sub-admin" and "admin"
//   (req, res) => {
//     res.json({ message: "Welcome Sub admin", user: req.user });
//   }
// );

// router.get(
//   "/user",
//   authenticate, // Accessible to any authenticated user
//   (req, res) => {
//     res.json({ message: "Welcome user", user: req.user });
//   }
// );

// export default router;
