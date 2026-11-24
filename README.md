# Student Management REST API &mdash; Node.js, Express.js & MySQL

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Postman](https://img.shields.io/badge/Postman-Tested-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

A production-ready **RESTful API** for student registration and management built with **Node.js**, **Express.js**, and **MySQL**.

Engineered by **U B Aiswarya** for **Module 03 (Week 3 Deliverable)** of the Internship Program.

---

## 🌟 GitHub Repository
- **GitHub Repository:** [https://github.com/aiswaryabala17/student-management-api](https://github.com/aiswaryabala17/student-management-api)

---

## 🎯 Key Objectives Achieved

| Objective | Implementation Details |
| :--- | :--- |
| **RESTful API Architecture** | Built with Node.js and Express.js using standard MVC directory structure (`config`, `controllers`, `models`, `routes`, `middleware`). |
| **MySQL Database Integration** | Connection pooling via `mysql2/promise`, relational schema (`schema.sql`), indexed columns, and automatic connection health checking. |
| **CRUD Endpoints** | Complete Register (POST), Retrieve (GET all & by ID), Update (PUT), and Delete (DELETE) operations. |
| **Input Validation & Security** | Middleware validation verifying email patterns, 10-digit phone numbers, required fields, and preventing duplicate IDs or emails. |
| **Search, Filter & Sort** | Query params supporting text search (`?search=`), department filter (`?department=`), and sorting by name, CGPA, or ID (`?sortBy=`). |
| **Postman Test Suite** | Pre-configured Postman Collection (`postman/Student_Management_API.postman_collection.json`) covering all 10 endpoints. |

---

## 📂 Project Directory Structure

```text
student-management-api/
├── server.js                # Application entry point & server bootstrap
├── package.json             # Node dependencies and npm scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignored patterns
├── push_to_github.sh        # Quick script to push to GitHub
├── config/
│   └── db.js                # MySQL connection pool & health testing
├── controllers/
│   └── studentController.js # Request handlers & status code responses
├── models/
│   └── studentModel.js      # SQL query abstraction with fallback demo layer
├── routes/
│   └── studentRoutes.js     # REST endpoint routing definitions
├── middleware/
│   ├── validation.js        # Request payload validation middleware
│   └── errorHandler.js      # Global error and 404 response handlers
├── sql/
│   └── schema.sql           # Database creation & initial seed script
└── postman/
    └── Student_Management_API.postman_collection.json # 1-click Postman collection
```

---

## 📚 API Endpoints Reference

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Catalog & Server Status | `200 OK` |
| `GET` | `/api/health` | Health Check & Database Connectivity | `200 OK` |
| `POST` | `/api/students` | Register a new student | `201 Created` |
| `GET` | `/api/students` | Retrieve all students (Supports search, filter, sort) | `200 OK` |
| `GET` | `/api/students/:id` | Retrieve single student by ID | `200 OK` / `404 Not Found` |
| `PUT` | `/api/students/:id` | Update student details | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/students/:id` | Delete student record | `200 OK` / `404 Not Found` |
| `GET` | `/api/students/stats/summary` | Get student & department metrics | `200 OK` |

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/aiswaryabala17/student-management-api.git
cd student-management-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup MySQL Database
1. Make sure MySQL server is running locally (e.g. via MySQL Workbench, XAMPP, or Homebrew).
2. Execute the schema script:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
3. Configure your `.env` file:
   ```bash
   cp .env.example .env
   ```
   Update `DB_USER`, `DB_PASSWORD`, and `DB_PORT` if needed.

### 4. Start the Server
```bash
# Production mode
npm start

# Development mode (with live reload)
npm run dev
```

Server will start at `http://localhost:5000`.

---

## 🧪 Testing with Postman

1. Open **Postman**.
2. Click **Import** (top left).
3. Select the file: `postman/Student_Management_API.postman_collection.json`.
4. Run any of the 10 pre-configured requests against `http://localhost:5000`!

---

## 💻 Sample cURL Commands

### 1. Check Health & DB Status
```bash
curl -X GET http://localhost:5000/api/health
```

### 2. Register a New Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "id": "STU-2024-006",
    "full_name": "Meera Nambiar",
    "email": "meera.nambiar@example.com",
    "phone": "9876543210",
    "dob": "2004-02-15",
    "gender": "Female",
    "department": "Information Technology",
    "semester": "Semester 6",
    "cgpa": 9.15,
    "status": "Active",
    "address": "Kochi, Kerala"
  }'
```

### 3. Retrieve All Students
```bash
curl -X GET http://localhost:5000/api/students
```

### 4. Search and Filter
```bash
# Filter by Department
curl -X GET "http://localhost:5000/api/students?department=Computer%20Science%20%26%20Engineering"

# Search by Name
curl -X GET "http://localhost:5000/api/students?search=Aiswarya"
```

### 5. Update Student
```bash
curl -X PUT http://localhost:5000/api/students/STU-2024-002 \
  -H "Content-Type: application/json" \
  -d '{"cgpa": 9.40, "semester": "Semester 8"}'
```

### 6. Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/STU-2024-006
```

---

## 👤 Author

- **Developer:** U B Aiswarya
- **GitHub:** [@aiswaryabala17](https://github.com/aiswaryabala17)
- **Specialization:** Aspiring Full-Stack .NET Developer & Software Engineer
- **Degree:** B.Tech (2023 - 2027)

---
*Created for Module 03 (Week 3) of the Internship Program.*
