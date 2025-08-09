
# 🍲 Recipe App REST API
A simple yet powerful REST API for a recipe application — built to manage recipes, reviews, categories, and users.Anyone can explore delicious recipes, but only registered users can add new ones.
Includes authentication, ratings, and more.

---

## 🚀 Features

- **User Management** – Sign up, log in, and OTP verification *(optional for now)*  
- **Recipe Management** – View, add, update, and delete recipes  
- **Categories** – Pakistani, Chinese, Indian — and more can be added  
- **Reviews & Ratings** – Users can leave reviews with ratings and likes/dislikes  
- **Role-based Access** – Admin and regular user permissions  
- **MongoDB Database** – Well-structured collections for scalable data handling  

---

##🛠 Tech Stack
- **Node.js** – Server runtime  
- **Express.js** – API framework  
- **MongoDB** – Database 
---

## ⚙ Environment Variables
Create a `.env` file in the project root with the following:

```env
PORT=5000
HOST=localhost
DB_HOST=localhost
MONGODB_URI="mongodb://localhost:27017/backend_api_db_nxb_dev"
WEBAPP_URL="http://localhost:8081"

## ▶ How to Run
npm run dev  # Start in development mode (with nodemon)
npm start  # Start in production mode

## 📌 Example Endpoint
Get all users:

GET localhost:5000/users

<p align="center"> <b><i>🍴 This API was cooked with love, sprinkled with validations, and garnished with MongoDB queries.