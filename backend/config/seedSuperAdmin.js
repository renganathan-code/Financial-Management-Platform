const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedSuperAdmin = async () => {
  const fullName = process.env.SUPER_ADMIN_NAME || "Platform Super Admin";

  const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();

  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Super Admin email and password are missing from .env");
  }

  // Check whether this account already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.role !== "superadmin") {
      throw new Error(
        "The configured Super Admin email already belongs to a non-Super Admin account.",
      );
    }

    console.log("Super Admin account already exists.");
    return;
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the Super Admin account
  await User.create({
    fullName,
    email,
    password: hashedPassword,
    role: "superadmin",
    requestedRole: "admin",
    status: "approved",
  });

  console.log("Default Super Admin created successfully.");
};

module.exports = seedSuperAdmin;
