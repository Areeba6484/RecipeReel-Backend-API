// seeders/reviews.seeder.js
import Review from "../models/reviews.models.js";

export const reviewsData = [
  {
    rating: 4,
    comment: "Delicious and easy to follow! My family loved it.",
    createdAt: new Date("2025-07-16T10:30:00Z"),
    reactions: {
      likes: 5,
      dislikes: 0
    },
    recipe: "6888c35e1bb23ef0be147645", // Recipe ID
    user: "68a18aba6511fbf8fc024b25" // User ID
  },
  {
    rating: 5,
    comment: "Amazing flavors and the mint sauce was perfect!",
    createdAt: new Date("2025-07-16T14:00:00Z"),
    reactions: {
      likes: 10,
      dislikes: 1
    },
    recipe: "6888c35e1bb23ef0be147646",
    user: "68a18b086511fbf8fc024b29"
  },
  {
    rating: 3,
    comment: "Good recipe, but a bit too sweet for my taste.",
    createdAt: new Date("2025-07-16T17:45:00Z"),
    reactions: {
      likes: 2,
      dislikes: 2
    },
    recipe: "68944cfe44d8d3330fc06247",
    user: "68a18b296511fbf8fc024b2c"
  }
];

export const seedReviews = async () => {
  try {
    await Review.deleteMany(); // Clears old reviews
    await Review.insertMany(reviewsData);
    console.log("✅ Reviews seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding reviews:", error);
  }
};
