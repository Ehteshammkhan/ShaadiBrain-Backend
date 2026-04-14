# 💍 Shadi Brain – Backend

A scalable backend for **Shadi Brain**, a wedding planning application that helps families manage events, budgets, expenses, and tasks collaboratively.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **Sequelize ORM**
* **JWT Authentication**
* **bcryptjs** (Password hashing)

---

## 📁 Project Structure

```
backend/
│── controllers/
│   ├── auth/
│   ├── wedding/
│   ├── events/
│
│── models/
│   ├── User.js
│   ├── Wedding.js
│   ├── WeddingMember.js
│   ├── Event.js
│
│── routes/
│   ├── auth.routes.js
│   ├── wedding.routes.js
│   ├── event.routes.js
│
│── middleware/
│   └── auth.middleware.js
│
│── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│
│── config/
│   └── db.js
│
│── index.js
│── .env
```

---

## 🔐 Authentication

* Uses **JWT-based authentication**
* Token must be sent in headers:

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### 🔑 Auth APIs

#### ➤ Register User

```
POST /api/auth/register
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

#### ➤ Login User

```
POST /api/auth/login
```

**Body:**

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "user": {},
  "token": "JWT_TOKEN"
}
```

---

### 💒 Wedding APIs

#### ➤ Create Wedding

```
POST /api/weddings/create
```

**Headers:**

```
Authorization: Bearer token
```

**Body:**

```json
{
  "title": "Rahul & Priya Wedding",
  "date": "2026-12-10",
  "totalBudget": 500000
}
```

---

#### ➤ Get My Weddings

```
GET /api/weddings/my
```

---

### 🎉 Event APIs

#### ➤ Create Event

```
POST /api/events/create
```

**Body:**

```json
{
  "name": "Mehendi",
  "budget": 50000,
  "weddingId": 1
}
```

---

#### ➤ Get Events by Wedding

```
GET /api/events/:weddingId
```

---

## 🧠 Core Architecture

```
User
  ↓
WeddingMember (role-based access)
  ↓
Wedding
  ↓
Event
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```
PORT=5000

DB_NAME=your_db_name
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost

JWT_SECRET=your_secret_key
```

---

## ▶️ Run Project

### 1. Install dependencies

```
npm install
```

### 2. Start server

```
npm run dev
```

---

## 🧪 Testing APIs

You can test APIs using:

* Postman
* Thunder Client
* cURL

---

## 📌 Features Implemented

* ✅ User Authentication (JWT)
* ✅ Wedding Creation & Management
* ✅ Event Management
* ✅ Role-based Membership (Admin / Member)
* ✅ Structured API Responses
* ✅ Error Handling Middleware

---

## 🚧 Upcoming Features

* Expense Tracking
* Task Management
* Notifications
* Analytics Dashboard

---

## 👨‍💻 Author

Ehatisham Khan

---

## ⭐ Notes

* Follow clean architecture
* Use reusable utilities (`ApiResponse`, `ApiError`, `asyncHandler`)
* Keep controllers thin and logic clean

---

💡 *This backend is designed to scale with mobile-first applications using React Native.*
