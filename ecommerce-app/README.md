# Full Stack E-Commerce App

A responsive full-stack E-Commerce web application built using React.js, Node.js, Express.js, and MySQL.

## Features

- User Registration & Login
- JWT Authentication
- Product Listing
- Product Details Page
- Search Functionality
- Cart System
- Quantity Management
- Order Placement
- Orders History
- Add Product Feature
- Responsive UI

---

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- JWT
- bcryptjs

---

## Project Structure

ecommerce-app/
│
├── frontend/
│
└── backend/

---

## Installation

### Backend Setup

```bash
cd backend
npm install
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Database Setup

Create MySQL database:

```sql
CREATE DATABASE ecommerce;
```

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);
```

### Products Table

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  image TEXT,
  description TEXT
);
```

### Orders Table

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(10,2)
);
```

---

## API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

### Products

- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products/add`

### Orders

- POST `/api/orders/place`
- GET `/api/orders/:user_id`

---

## Screenshots

Add project screenshots here.

---

## Future Improvements

- Razorpay Payment Integration
- Wishlist
- Product Categories
- Admin Dashboard
- User Profile Page
- Dark Mode
- Deployment

---

## Author

Tejaswini