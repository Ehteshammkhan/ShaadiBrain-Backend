import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import sequelize from "./config/db.js";
import authRoutes from "./routes/user/auth.routes.js";
import eventRoutes from "./routes/events/event.routes.js";
import taskRoutes from "./routes/task/task.routes.js";
import dashboardRoutes from "./routes/dashboard/dashboard.routes.js";
import expenseRoutes from "./routes/expense/expense.routes.js";

import verifyJWT from "./middleware/auth.middleware.js";
import ApiError from "./utils/ApiError.js";
import "./models/index.js";

dotenv.config();

const app = express();

// 🔐 Security
app.use(helmet());

// 🌐 CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// 📦 Body parser
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Test route
app.get("/", (req, res) => {
  res.send("Shadi Brain Backend Running 🚀");
});

app.get("/api/protected", verifyJWT, (req, res) => {
  res.json({ success: true, user: req.user });
});

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// DB connection
const connectDB = async () => {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully");

  console.log("✅ All tables synced");
};

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  });