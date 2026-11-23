
const express = require("express");
const User = require("../models/User");
const allowRoles = require("../middleware/roleMiddleware");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all pending registrations
router.get(
  "/pending-registrations",
  protect,
  allowRoles("superadmin"),
  async (req, res) => {
    try {
      const users = await User.find({
        status: "pending",
      })
        .select("fullName email requestedRole status createdAt")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        message: "Pending registrations fetched successfully",
        count: users.length,
        users,
      });
    } catch (error) {
      console.error("Pending registrations error:", error.stack);

      return res.status(500).json({
        message: "Failed to fetch pending registrations",
      });
    }
  }
);

// Approve a pending registration
router.patch(
  "/:userId/approve",
  protect,
  allowRoles("superadmin"),
  async (req, res) => {
    try {
      const pendingUser = await User.findOne({
        _id: req.params.userId,
        status: "pending",
      });

      if (!pendingUser) {
        return res.status(404).json({
          message: "Pending registration not found",
        });
      }

      if (!["admin", "user"].includes(pendingUser.requestedRole)) {
        return res.status(400).json({
          message: "Invalid requested role",
        });
      }

      pendingUser.role = pendingUser.requestedRole;
      pendingUser.status = "approved";

      await pendingUser.save();

      return res.status(200).json({
        message: "Registration approved successfully",
        user: {
          id: pendingUser._id,
          fullName: pendingUser.fullName,
          email: pendingUser.email,
          role: pendingUser.role,
          status: pendingUser.status,
        },
      });
    } catch (error) {
      console.error("Approve registration error:", error.stack);

      return res.status(500).json({
        message: "Failed to approve registration",
      });
    }
  }
);

// Reject a pending registration
router.patch(
  "/:userId/reject",
  protect,
  allowRoles("superadmin"),
  async (req, res) => {
    try {
      const pendingUser = await User.findOne({
        _id: req.params.userId,
        status: "pending",
      });

      if (!pendingUser) {
        return res.status(404).json({
          message: "Pending registration not found",
        });
      }

      pendingUser.status = "rejected";

      await pendingUser.save();

      return res.status(200).json({
        message: "Registration rejected successfully",
        status: pendingUser.status,
      });
    } catch (error) {
      console.error("Reject registration error:", error.stack);

      return res.status(500).json({
        message: "Failed to reject registration",
      });
    }
  }
);

module.exports = router;
