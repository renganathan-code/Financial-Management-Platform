const express = require("express");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin and User can access
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "profile access successful",
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

//Only Admin can access
router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome admin",
  });
});

module.exports = router;
