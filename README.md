# Employee Management System

A full-stack **Employee Management System** built with **React.js, Node.js, Express.js, and MySQL**.

The application provides user authentication, role-based access control, admin and employee dashboards, profile management, user management, and password reset functionality.

---

## 🚀 Features

### 🔐 Authentication

* User Signup
* User Login
* JWT-based authentication
* Protected routes
* Role-based authorization
* Password hashing
* Forgot Password
* Reset Password
* Email functionality for password reset

### 👨‍💼 Admin Features

* Admin Dashboard
* View and manage users
* Admin profile
* Role-based access control
* Protected admin routes

### 👨‍💻 Employee Features

* Employee Dashboard
* Employee Profile
* Protected employee routes
* Role-based access control

### 🎨 Frontend Features

* React.js
* React Router
* Axios API integration
* Tailwind CSS
* Responsive UI
* Toast notifications
* Protected routes
* Role-based navigation

### ⚙️ Backend Features

* Node.js
* Express.js
* RESTful APIs
* MySQL database
* JWT authentication
* Password hashing
* Authentication middleware
* Admin authorization middleware
* Email functionality

---

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Vite
* React Toastify

### Backend

* Node.js
* Express.js
* MySQL
* JWT
* bcrypt
* Nodemailer

---

## 📁 Project Structure

```text
employee-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── isAdmin.js
│   │   └── verifyToken.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   └── sendEmail.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Asajyothi-nath/employee-management-system.git
```

Navigate to the project folder:

```bash
cd employee-management-system
```

---

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=8000

DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret
```

Add any additional environment variables required for email/password-reset functionality.

Start the backend:

```bash
npm start
```

If the project uses nodemon:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

---

## 💻 Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 🔑 User Roles

The application supports two user roles.

### Admin

Admin users can access:

* Admin Dashboard
* User Management
* Admin Profile
* Other protected administrative features

### Employee

Employee users can access:

* Employee Dashboard
* Employee Profile
* Other protected employee features

Access to these routes is controlled using authentication and role-based authorization.

---

## 🔄 Application Flow

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │    Signup    │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │    Login     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │     JWT      │
                    │Authentication│
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
          ┌──────▼──────┐     ┌──────▼──────┐
          │    Admin    │     │   Employee  │
          └──────┬──────┘     └──────┬──────┘
                 │                   │
          ┌──────▼──────┐     ┌──────▼──────┐
          │   Admin     │     │  Employee   │
          │  Dashboard  │     │  Dashboard  │
          └─────────────┘     └─────────────┘
```

---

## 🌐 API Functionality

The backend provides REST APIs for:

* User Signup
* User Login
* Authentication
* User Management
* Admin Operations
* Employee Operations
* Profile Management
* Forgot Password
* Reset Password

The React frontend communicates with the backend APIs using **Axios**.

---

## 🔒 Security

The application implements several security practices:

* Passwords are hashed before being stored.
* JWT tokens are used for authentication.
* Protected routes prevent unauthorized access.
* Admin routes are protected using role-based authorization.
* Sensitive configuration values are stored in environment variables.
* `.env` files are excluded from GitHub using `.gitignore`.

---

## 📦 Important Notes

Before running the project, make sure:

1. Node.js is installed.
2. MySQL is installed and running.
3. The required database has been created.
4. Backend environment variables are configured.
5. Backend dependencies are installed.
6. Frontend dependencies are installed.

---

## 🚫 Environment Variables

Environment files are intentionally **not included in this repository** for security reasons.

Create your own `.env` file inside the backend folder and configure:

```text
PORT
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
```

Do not commit passwords, database credentials, JWT secrets, or other sensitive information to GitHub.

---

## 📌 Future Improvements

Possible future improvements include:

* Employee search and filtering
* Pagination
* Improved dashboard analytics
* Profile image upload
* Advanced user management
* Improved validation
* Automated testing
* Production deployment
* Docker support

---

## 👩‍💻 Author

**Asha Jyothi**

GitHub: https://github.com/Asajyothi-nath

## 🔗 Project Repository

https://github.com/Asajyothi-nath/employee-management-system

---

⭐ If you find this project useful, feel free to star the repository.
