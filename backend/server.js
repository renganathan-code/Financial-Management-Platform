const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const rbacRoutes = require("./routes/rbacRoutes");
const seedSuperAdmin = require("./config/seedSuperAdmin");
const superAdminRoutes = require("./routes/superAdminRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rbac", rbacRoutes);
app.use("/api/superadmin", superAdminRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is health running",
  });
});

app.get("/api/protceted", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You accessed a protected route",
    userId: req.user.id,
  });
});

const startServer = async () => {
  try {
    await connectDB();
    await seedSuperAdmin();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};

startServer();
