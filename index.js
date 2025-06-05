const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    const token = req.cookies['access_token'];

    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const usersCollection = client.db("JWT").collection("users");

        // Middleware to authenticate token

        // Register
        app.post('/register', async (req, res) => {
            const { username, password } = req.body;
            const existingUser = await usersCollection.findOne({ username });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await usersCollection.insertOne({ username, password: hashedPassword });
            res.status(201).json({ message: 'User registered', userId: result.insertedId });
        });

        // Login
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            const user = await usersCollection.findOne({ username });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // res.json({ token });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
                sameSite: 'Strict', // or 'Lax' for more compatibility
                maxAge: 60 * 60 * 1000, // 1 hour
            });
            res.json({ message: 'Login successful' });
        });

        app.post('/logout', (req, res) => {
            res.clearCookie('access_token');
            res.json({ message: 'Logged out' });
        });

        // Protected route
        app.get('/protected', authenticateToken, (req, res) => {
            res.json({ message: `Hello ${req.user.username}, this is protected data.` });
        });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Welcome to the API. Server is running!");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
