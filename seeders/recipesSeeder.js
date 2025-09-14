import Recipe from "../models/recipes.model.js";

export const seedRecipes = async () => {
  try {
    const recipes = [
      {
        title: "Lamb Chops with Mint",
        description: "Tender lamb chops paired with a refreshing mint sauce.",
        time: "30 mins",
        rating: 4.9,
        category: "Indian",
        ingredients: [
          "6 lamb chops",
          "Fresh mint leaves",
          "Garlic cloves",
          "Olive oil",
          "Salt & pepper"
        ],
        instructions: [
          "Blend mint, garlic, and oil to make sauce.",
          "Season lamb chops and grill 5 mins each side.",
          "Serve with mint sauce."
        ],
        createdAt: new Date("2025-07-17T00:00:00.000Z"),
        savedBy: ["6891f0ca9e6b73c65e7c0f9b"], // user ObjectId
        userId: "68a18b086511fbf8fc024b29",   // reference to user
        reviewsId: ["689c73cdbee3bc519fb35118"] // review ObjectId
      },
      {
        title: "Biryani",
        description: "Juicy and flavorful chicken cooked to perfection.",
        time: "25 mins",
        rating: 4.9,
        category: "Pakistani",
        ingredients: [
          "1kg rice",
          "2 tbsp spices",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Mix all ingredients in a bowl."
        ],
        createdAt: new Date("2025-08-07T06:51:42.913Z"),
        savedBy: ["6891f0ca9e6b73c65e7c0f9d"],
        userId: "68a18aba6511fbf8fc024b25",
        reviewsId: ["689c73cdbee3bc519fb35119"]
      },
      {
        title: "Traditional Spare Ribs",
        description: "Juicy and flavorful ribs slow-cooked to perfection.",
        time: "25 mins",
        rating: 4.5,
        category: "Pakistani",
        ingredients: [
          "1kg spare ribs",
          "2 tbsp soy sauce",
          "1 tbsp honey",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Mix all ingredients in a bowl.",
          "Marinate the ribs for 2 hours.",
          "Cook in oven at 180°C for 25 minutes."
        ],
        createdAt: new Date("2025-08-17T09:30:08.371Z"),
        savedBy: [],
        userId: "68a18aba6511fbf8fc024b25",
        reviewsId: []
      }
    ];

    await Recipe.deleteMany(); // Clear old data
    await Recipe.insertMany(recipes);

    console.log("✅ Recipes seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding recipes:", error.message);
  }
};
