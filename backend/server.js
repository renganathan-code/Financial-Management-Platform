const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes)

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is health running",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};

startServer();
