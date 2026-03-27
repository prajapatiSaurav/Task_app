# 📝 Task List Application

A simple full-stack Task List app built using **Node.js, Express, PostgreSQL, React (Vite), and JWT Authentication**.

---

## 🚀 Features
- User Registration & Login
- Secure authentication using JWT
- Password hashing with bcrypt
- Create and fetch user-specific tasks
- Protected APIs
- Basic validation & error handling

---

## 🗄️ Tech Stack
- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL  

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login user  

### Tasks (Protected)
- `GET /api/tasks` → Get user tasks  
- `POST /api/tasks` → Create task  

---

## ⚠️ Status Codes
- `200` → Success  
- `201` → Created  
- `400` → Bad Request  
- `401` → Unauthorized  
- `500` → Server Error  

---

## 🧪 Behavior
- Empty input → Validation error  
- Invalid credentials → Error message  
- Server down → Connection error  
- Valid request → Success response  

---

## ▶️ Run Project

### Backend
```bash
cd backend
npm install
npm run dev
