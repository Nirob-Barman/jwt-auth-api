# JWT Auth API

A secure authentication API using **JWT tokens in HTTP headers** (via `Authorization: Bearer <token>`). Built with **Node.js**, **Express**, **MongoDB**, **JWT**, and **bcrypt** for hashing passwords. It includes user registration, login, and a protected route that requires a valid JWT token.

---

## 🚀 Branch Options

## 🚀 Branch Options

This project supports two different authentication strategies:

| Branch             | Description                          |
|--------------------|--------------------------------------|
| `main`             | Uses **Authorization header** for JWT |
| `cookie-jwt-auth`  | Uses **HTTP-only cookies** for JWT   |

> 👉 To switch to the cookie-based auth version:
```bash
git checkout cookie-jwt-auth
```
🔄 [View `cookie-jwt-auth` branch on GitHub](https://github.com/Nirob-Barman/jwt-auth-api/tree/cookie-jwt-auth)


## Features

- 🔐 User registration with password hashing
- 🔐 User login with JWT token generation
- 🔐 Protected route accessible only with valid token
- 🌐 CORS enabled
- 📦 MongoDB for data storage

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (with MongoDB Atlas)
- JSON Web Tokens (JWT)
- bcrypt.js
- dotenv

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account (or a local MongoDB instance)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Nirob-Barman/jwt-auth-api.git
cd jwt-auth-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a .env file in the root directory**

```bash
PORT=3000
DB_USER=yourMongoUser
DB_PASS=yourMongoPassword
JWT_SECRET=yourJWTSecret
```

4. **Start the server:**
If you're using a dev tool like nodemon:
```bash
npm run dev
```
Otherwise:
```
node index.js
```


5. **Open your browser and visit:**

```bash
http://localhost:3000
```



## API Endpoints

`POST /register`

Registers a new user.

**Request Body:**

```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```
**Response:**

```json
{
  "message": "User registered",
  "userId": "uniqueUserId"
}
```

`POST /login`

Logs in a user and returns a JWT.

**Request Body:**

```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

**Response:**

```json
{
  "token": "yourJWTToken"
}
```

`GET /protected`

Protected route. Requires a valid JWT in the header.

`Headers:`
```
Authorization: Bearer yourJWTToken
```
**Response:**

```json
{
  "message": "Hello username, this is protected data."
}
```

## Project Structure
```
jwt-auth-api/
│
├── .env              # Environment variables
├── index.js          # Main server file
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

## ✍️ Author

- 👤 **Nirob Barman**  
- [![Medium](https://img.shields.io/badge/Medium-Blog-black?logo=medium)](https://nirob-barman.medium.com/)
- [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/nirob-barman/)
- [![Portfolio](https://img.shields.io/badge/Portfolio-Visit-brightgreen?logo=firefox-browser)](https://nirob-barman-19.web.app/)
- [![Email](https://img.shields.io/badge/Email-Contact-orange?logo=gmail)](mailto:nirob.barman.19@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).