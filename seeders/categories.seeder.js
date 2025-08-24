// seeders/categories.seeder.js
import Category from "../models/category.model.js";

export const categoriesData = [
  {
    name: "Chinese",
    description: "Popular Chinese cuisine with savory flavors."
  },
  {
    name: "Indian",
    description: "Spicy and flavorful recipes from India."
  },
  {
    name: "Pakistani",
    description: "Spicy and flavoured Chicken biryani."
  }
];

export const seedCategories = async () => {
  try {
    await Category.deleteMany(); // Clears old categories
    await Category.insertMany(categoriesData);
    console.log("✅ Categories seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  }
};
