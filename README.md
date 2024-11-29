# Role-based access control (RBAC) system

## Overview

This project implements a secure and scalable REST API for user authentication and role management. The API supports user registration, login, email verification, and role-based access control (RBAC) with a dedicated role management feature accessible only by administrators. The project also includes Swagger documentation for easy API exploration.

## Features

- **User Authentication**: Register, login, and logout with JWT-based authentication.
- **Email Verification**: Email verification upon registration.
- **Role-Based Access Control (RBAC)**: Admin, User, and Moderator roles with access restrictions.
- **Role Management**: Admins can update user roles via the `manage-role` endpoint.
- **Swagger Documentation**: Interactive API documentation available at `/swagger`.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **Validation**: Validator.js
- **Documentation**: Swagger (swagger-autogen)
- **Environment Variables**: dotenv

---

## Folder Structure

```
rbac-system/
├── controllers/
│   ├── authController.js    # Handles user authentication logic
│   ├── userController.js    # Manages user operations (e.g., role updates)
├── middlewares/
│   ├── authMiddleware.js    # JWT authentication and token validation
│   ├── roleMiddleware.js    # Role-based access control middleware
├── models/
│   ├── User.js              # User schema and Mongoose model
├── routes/
│   ├── authRoutes.js        # Routes for authentication endpoints
│   ├── userRoutes.js        # Routes for user-related operations
├── utils/
│   ├── sendEmail.js         # Utility function to send emails
├── swagger.js               # Swagger setup and endpoint definitions
├── swagger.json             # Auto-generated Swagger documentation
├── .env                     # Environment variables
├── package.json             # Project metadata and dependencies
├── index.js                 # Main server file
```

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SahilAli8808/VRV-Security.git
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   BASE_URL=http://localhost:5000
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

---

## API Endpoints

### **Authentication Endpoints**
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/auth/register`    | Register a new user        |
| POST   | `/api/auth/login`       | User login                 |
| GET    | `/api/auth/verify-email/:token` | Verify user email   |
| POST   | `/api/auth/logout`      | User logout (token blacklisting) |

### **User Management Endpoints**
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/users/`           | Get all users (Admin only) |
| PATCH  | `/api/users/manage-role`| Change user role (Admin only) |

---

## Swagger Documentation

Swagger documentation is available at:
```
http://localhost:3000/swagger
```

Use this interactive interface to test and explore the API endpoints.

---

## Security Measures

- **Password Hashing**: All passwords are hashed using `bcrypt`.
- **JWT Authentication**: Tokens are used for secure user authentication.
- **RBAC**: Restricts access to endpoints based on user roles.
- **Input Validation**: Validates user input to prevent malformed requests.

---

## Future Improvements

- Add rate limiting to prevent brute force attacks.
- Implement refresh tokens for seamless session management.
- Add multi-factor authentication (MFA) for enhanced security.

---

## Author

Developed by **Sahil Ali**  
For inquiries, contact [sahilali.cs@gmail.com].