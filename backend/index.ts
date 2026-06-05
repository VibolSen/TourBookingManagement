// Express Backend
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/db.js";
import authRoutes from "./routes/auth-route.js";
import locationRoute from "./routes/loaction-route.js";
import categoryRoutes from "./routes/category-route.js";
import tourRoutes from "./routes/company-routes/addpackage-route.js";
import adminRouter from "./routes/admin-route.js";
import policiesRouter from "./routes/company-routes/routes-routes.js";
import bookingRoutes from "./routes/company-routes/booking-routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("uploads")));

connectToDatabase();

app.get("/", (req, res) => {
  res.json("Hello");
});
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/admins", adminRouter);
app.use("/api/policies", policiesRouter);
app.use("/api/bookings", bookingRoutes);

app.use(
  cors({
    origin: "https://wctproject.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});