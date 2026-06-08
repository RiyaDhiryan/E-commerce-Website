# 🛍️ E-Commerce Website (MERN Stack)

A full-stack E-commerce web application built using **React, Node.js, Express, and MongoDB**.  
It includes authentication, product management, cart system, and payment integration.

---

## 🚀 Features

### 👤 User Side
- User Registration & Login (JWT Authentication)
- Product Listing with Images & Categories
- Add to Cart / Update Quantity / Remove Items
- Place Orders with Address Details
- Payment Integration (Stripe / Cash on Delivery)
- Order History Page

### 🛠️ Admin Side
- Add New Products
- Upload Images (Cloudinary Integration)
- Manage Product List
- Manage Orders

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React.js (Vite)
- Context API
- Axios
- React Router
- React Toastify
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payment Gateway
- Cloudinary (Image Upload)

---

## 📂 Project Structure
Frontend/
Backend/
## ⚙️ Installation & Setup

### Backend
cd Backend
npm run server

### Frontend
cd Frontend
npm install
npm run dev

PORT=4000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_SECRET_KEY=xxx

VITE_BACKEND_URL=http://localhost:4000

