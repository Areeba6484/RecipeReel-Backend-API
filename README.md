# 🏨 HostelValy Backend API


This is the backend API for **Recipe App**, a sleek platform for exploring, sharing, and reviewing recipes.  
Built with **Node.js**, **Express**, and **MongoDB**, it powers the frontend with authentication, recipe management, reviews, and more.

---

## 🚀 Features


- 🔑 **User Authentication** – Sign up, login, JWT-based security, and OTP verification.  
- 🛡 **Role-based Authorization** – Admin vs. regular user permissions.  
- 📖 **Recipe Management** – CRUD operations on recipes.  
- 🗂 **Categories** – Organize recipes by cuisine (Pakistani, Chinese, Indian).  
- ⭐ **Reviews & Ratings** – Users can rate, review, and react to recipes.  
- 📦 **Modular Structure** – Clean separation of controllers, models, routes, and middleware.  
* 🛡️ **Auth Middleware**: Protects routes and automatically extracts user info from JWT.

---

## 🧑‍💻 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (via Mongoose)**
* **dotenv** for environment variable handling
* **cors** for cross-origin API access
* **morgan** for request logging
* **jsonwebtoken** for secure token handling

---

## 🗃️ MongoDB Database: `recipe-reel`

The backend uses a MongoDB database with the following collections:

**Collections & their purposes:**

| Collection   | Purpose                                  |
|--------------|------------------------------------------|
| 👤 `users`   | Stores user credentials & profile data   |
| 🍳 `recipes` | Contains recipe details & metadata       |
| 🍽 `categories` | Cuisine categories like Pakistani, Indian, Chinese |
| ⭐ `reviews` | Stores user reviews and reactions        |


---

## 📁 Project Structure

```
📦 recipe-app-backend/
├── config/
│ └── database.js # MongoDB connection
├── controllers/
│ ├── users.controller.js
│ ├── recipes.controller.js
│ ├── category.controller.js
│ └── reviews.controller.js
├── models/
│ ├── users.model.js
│ ├── recipes.model.js
│ ├── category.model.js
│ └── reviews.model.js
├── routes/
│ ├── users.routes.js
│ ├── recipes.routes.js
│ ├── category.routes.js
│ └── reviews.routes.js
├── middlewares/
│ ├── auth.js
│ └── api-limit.js
├── seeders/
│ ├── users.seeder.js
│ ├── recipes.seeder.js
│ ├── category.seeder.js
│ ├── reviews.seeder.js
│ └── seed.js # Runner for all seeders
├── .env
├── index.js
├── package.json
└── README.md

```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/recipe-app-backend.git
cd recipe-app-backend 
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file using the provided `.example.env`:

```env
PORT=5000
HOST=localhost
MONGODB_URI=mongodb://localhost:27017/recipe_app

WEBAPP_URL=http://localhost:8081

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
JWT_ISSUER=your_jwt_issuer
JWT_AUDIENCE=your_jwt_audience
```

### 4. Run the Development Server

```bash
npm run dev
```

The server will start at: [http://localhost:5000](http://localhost:5000)

To run in production mode:

```bash
npm start
```

### 🌱 Run Seeders

Populate the database with initial data:

```bash
npm run seed
```

Make sure MongoDB is running locally before executing the seeder.

---

## 📬 API Endpoints Overview

| Entity         | Endpoint             |
| -------------- | -------------------- |
| Recipes       | `/recipes`       |
| Users          | `/users`          |
| Reviews      | `/reviews`      |
| Categories       | `/categories`       |

Each route supports standard CRUD operations (**GET**, **POST**, **PUT**, **DELETE**).

---

## 🔗 Postman Collection

You can explore and test all API endpoints using our shared Postman collection:

📂 **RecipeReel Postman Collection**: [View on Postman](https://galactic-eclipse-587759.postman.co/workspace/My-Workspace~4ff641d6-d83f-40d0-8755-5ef64d77efba/collection/47880396-a79980c8-348c-4dbc-9f80-09f3c50d9ca6?action=share&source=copy-link&creator=47880396)

This Postman collection is named **RecipeReel-Backend-API** and contains folders corresponding to the database collections (`Recipes`, `Users`, `Categories`,`Reviews`). Each folder includes requests for all CRUD operations.

An environment named **RecipeReel-api-dev** is also included, with a variable:

* `recipeApiUrl` = `http://localhost:5000`

You can send requests like this:

```
{{recipeApiUrl}}/recipes
```

for fetching all recipes.

---

## 🔗 Related Projects

* 📦 **Frontend App** → [RecipeReel Frontendend](https://github.com/Areeba6484/Recipe-Reel-Frontend)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Authors & Mentors

| Role         | Name                                                                 |
| ------------ | -------------------------------------------------------------------- |
| 🧑‍💻 Author   | [Areeba](https://github.com/Areeba6484) – Developer of RecipeReel Backend API |
| 🎓 Mentor    | [Sir Allah Rakha](https://github.com/sudo-allahrakha) – Project Supervisor |
