const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

mongoose.connect("mongodb+srv://harinivas:harinivas123@firstproject.j7rwi4a.mongodb.net/?appName=FirstProject")
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = new User({ email, password });
        await user.save();

        res.json({ message: "Signup successful!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already registered" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing email or password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Email not found" });
        }

        if (user.password !== password) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        res.json({ success: true, message: "Login successful!" });
    } catch (err) {
        res.json({ success: false, message: "Server error" });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
