//require('dotenv').config()
const express = require("express")
const userModel = require('../model/User.jsx')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const router = express.Router();
const SECRET = "test";

router.get('/', (req, res, next) => {
    res.send('Welcome!')

});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const exsistingUser = await userModel.findOne({ email });
        if (exsistingUser) {
            return res.status(404).json({ message: "User already exsists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });
        const token = jwt.sign({ email: result.email, id: result.id }, SECRET, { expiresIn: "1h" });
        res.status(200).json({ user: result, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
})

router.post('/login', async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body
    try {
        const exsistingUser = await userModel.findOne({ email: email });
        if (!exsistingUser) {
            return res.status(404).json({ message: "User not found! " })
        }
        const matchPassword = await bcrypt.compare(password, exsistingUser.password);
        if (!matchPassword) {
            res.status(404).json({ message: "Incorrect Password" });

        }
        const token = jwt.sign({ email: exsistingUser.email, id: exsistingUser.id }, SECRET);
        res.status(200).json({ user: exsistingUser, token: token });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });

    }
})

module.exports = router;
