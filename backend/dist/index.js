"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express Backend
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_js_1 = __importDefault(require("./database/db.js"));
const auth_route_js_1 = __importDefault(require("./routes/auth-route.js"));
const loaction_route_js_1 = __importDefault(require("./routes/loaction-route.js"));
const category_route_js_1 = __importDefault(require("./routes/category-route.js"));
const addpackage_route_js_1 = __importDefault(require("./routes/company-routes/addpackage-route.js"));
const admin_route_js_1 = __importDefault(require("./routes/admin-route.js"));
const routes_routes_js_1 = __importDefault(require("./routes/company-routes/routes-routes.js"));
const booking_routes_js_1 = __importDefault(require("./routes/company-routes/booking-routes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.resolve("uploads")));
(0, db_js_1.default)();
app.get("/", (req, res) => {
    res.json("Hello");
});
app.use("/api/auth", auth_route_js_1.default);
app.use("/api/locations", loaction_route_js_1.default);
app.use("/api/categories", category_route_js_1.default);
app.use("/api/tours", addpackage_route_js_1.default);
app.use("/api/admins", admin_route_js_1.default);
app.use("/api/policies", routes_routes_js_1.default);
app.use("/api/bookings", booking_routes_js_1.default);
app.use((0, cors_1.default)({
    origin: "https://wctproject.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
}));
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
