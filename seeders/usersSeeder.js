import User from "../models/users.models.js"; // adjust path if needed

export const seedUsers = async () => {
  try {
    const users = [
      {
        name: "Chef Laura",
        userType: "user",
        recipeCount: 0,
        email: "laura@example.com",
        password: "$2b$10$rD5Dyw4.YboFnsDz4jKWp.BIoxNTGEcG.7/ci64MFx8luwMS67ITK", // already hashed
        isVerified: false,
        profilePicture: "default.jpg",
        status: "active",
        role: "user"
      },
      {
        name: "Admin Smith",
        userType: "admin",
        recipeCount: 0,
        email: "admin@example.com",
        password: "$2b$10$eA6oqoIgx8RySlSgfV.iLummRDX2C/BnHImaQ8aKiFf/r2DtXzLy.", // already hashed
        isVerified: false,
        profilePicture: "default.jpg",
        status: "active",
        role: "admin"
      },
      {
        name: "Jonny",
        userType: "user",
        recipeCount: 0,
        email: "jonny@example.com",
        password: "$2b$10$ihG.5GVsEl/hSMm7noWaGeOwm2g8ONho7cVwi8IEncahgvyVfMpJu",
        otp: "362977",
        otpExpired: new Date("2025-08-18T11:59:07.249Z"),
        isVerified: false,
        profilePicture: "default.jpg",
        status: "inactive",
        role: "user"
      }
    ];

    await User.deleteMany(); // clear old data
    await User.insertMany(users);
    console.log("✅ Users seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};
