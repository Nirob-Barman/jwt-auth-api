## 📁 `cookie-jwt-auth` → `README.md` (Cookie-based JWT)

# JWT Auth API

This version of the API uses **HTTP-only cookies** to store JWTs for secure authentication. Built with **Node.js**, **Express**, **MongoDB**, **JWT**, and **bcrypt**.

## Features

- Secure cookie-based JWT storage
- User registration and login
- Protected route with token authentication via cookies
- Logout functionality (clears cookie)
- CORS + credentials support
- MongoDB Atlas integration

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (with MongoDB Atlas)
- JSON Web Tokens (JWT)
- bcrypt.js
- cookie-parser
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
git checkout cookie-jwt-auth
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
NODE_ENV=development
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
  "message": "Login successful"
}
```

`GET /protected`

Protected route. The JWT is automatically sent as an HTTP-only cookie. No need to manually include it in headers.

**Response:**

```json
{
  "message": "Hello username, this is protected data."
}
```

`POST /logout`

Logs out a user by clearing the authentication cookie.

**Response:**
```json
{
  "message": "Logged out"
}
```

---

#### 🔐 **CORS and Cookies:**
CORS is configured to support credentials, and cookies are used for token transport:

> This version uses **HTTP-only cookies** for token storage. Make sure your frontend sends requests with `credentials: 'include'` when calling protected endpoints.

---


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