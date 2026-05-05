<div align="center">

<h1>🏢 HRMS — Human Resource Management System</h1>

<p>A full-stack <strong>SaaS-ready HRMS platform</strong> built with the <strong>MERN Stack</strong> to manage employees, attendance, leaves, and organizational workflows — all in one place.</p>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-4CAF50?style=for-the-badge)](https://hrms-sand-chi.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-MERNForge-181717?style=for-the-badge&logo=github)](https://github.com/MERNForge)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

![JavaScript](https://img.shields.io/badge/JavaScript-78.6%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-21.2%25-1572B6?style=flat-square&logo=css3)
![React](https://img.shields.io/badge/React.js-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Live Demo](#-live-demo)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🔍 Overview

**HRMS** is a comprehensive Human Resource Management System designed to digitize and simplify HR operations for organizations of any size. Built with a modern **MERN** stack architecture, it provides a seamless experience for both **admins** and **employees** through a role-based access system.

Whether you're managing a team of 10 or 1000, HRMS gives you the tools to handle employee records, track daily attendance, process leave applications, and monitor organizational performance — all from an intuitive dashboard.

---

## ✨ Features

### 👨‍💼 Employee Management
- Add, view, update, and delete employee records
- Store personal details, job title, department, and salary info
- Search and filter employees by department or role

### 🕒 Attendance Tracking
- Mark and track daily attendance per employee
- View attendance history and generate summaries
- Admin-level attendance overrides

### 📅 Leave Management
- Employees can apply for leave with type and date range
- Admin can approve or reject leave requests
- Track leave balance and history per employee

### 🔐 Role-Based Authentication
- Secure JWT-based login system
- Two roles: **Admin** and **Employee**
- Route protection based on user role

### 📊 Admin Dashboard & Analytics
- Real-time overview of total employees, attendance rate, and pending leaves
- Visual analytics for HR insights

### ⚡ Responsive UI
- Fully responsive design built with Tailwind CSS
- Clean and modern interface optimized for all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT (JSON Web Tokens) |
| **API Testing** | Postman |
| **Version Control** | Git & GitHub |
| **Deployment** | Vercel (Frontend) |

---

## 📂 Project Structure

```bash
HRMS/
 ├── frontend/               # React.js client
 │    ├── public/
 │    └── src/
 │         ├── components/   # Reusable UI components
 │         ├── pages/        # Dashboard, Employees, Attendance, Leaves
 │         ├── context/      # Auth context & global state
 │         ├── services/     # Axios API call functions
 │         └── App.js
 │
 ├── backend/                # Node.js + Express server
 │    ├── config/            # MongoDB connection setup
 │    ├── controllers/       # Business logic (employees, attendance, leaves)
 │    ├── middleware/        # JWT auth middleware
 │    ├── models/            # Mongoose schemas
 │    ├── routes/            # API route definitions
 │    └── server.js          # App entry point
 │
 ├── package-lock.json
 └── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas URI)
- [Git](https://git-scm.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MERNForge/HRMS.git
cd HRMS
```

### 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the `/backend` directory (see [Environment Variables](#-environment-variables)).

### 5️⃣ Run the Application

**Start the backend server:**
```bash
cd backend
npm run dev
```

**Start the frontend dev server:**
```bash
cd frontend
npm start
```

The app will be running at `http://localhost:3000` and the API at `http://localhost:5000`.

---

## 🔐 Environment Variables

Create a `.env` file in the `/backend` folder with the following variables:

```env
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=5000
```

> 💡 For MongoDB, you can use a free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

---

## 📡 API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/employees` | Get all employees | ✅ Admin |
| `POST` | `/api/employees` | Add new employee | ✅ Admin |
| `PUT` | `/api/employees/:id` | Update employee | ✅ Admin |
| `DELETE` | `/api/employees/:id` | Delete employee | ✅ Admin |
| `POST` | `/api/attendance` | Mark attendance | ✅ |
| `GET` | `/api/attendance/:id` | Get attendance record | ✅ |
| `POST` | `/api/leaves` | Apply for leave | ✅ Employee |
| `PUT` | `/api/leaves/:id` | Approve/Reject leave | ✅ Admin |
| `GET` | `/api/dashboard` | Get dashboard stats | ✅ Admin |

---

## 🌐 Live Demo

> 🔗 **[https://hrms-sand-chi.vercel.app/](https://hrms-sand-chi.vercel.app/)**

You can explore the live deployment of the frontend on Vercel.

**Demo Credentials:**

| Role | Email | Password |
|---|---|---|
| Admin | admin@hrms.com | admin123 |
| Employee | employee@hrms.com | emp123 |

---

## 🤝 Contributing

Contributions are always welcome! Here's how to get started:

1. **Fork** the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

Please make sure your code follows consistent formatting and includes relevant comments.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute it.

---

## 📧 Contact

**Deepanshu Sharma**

[![Email](https://img.shields.io/badge/Email-sharmadeepanshu0003@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:sharmadeepanshu0003@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-MERNForge-181717?style=flat-square&logo=github)](https://github.com/MERNForge)

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

*It motivates continued development and improvement.*

</div>
