const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp = async (req, res) => {
    try {
        const { email, password, name } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Please enter a valid email address" })
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" })
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "Email already exists" })
        }

        const hashPwd = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            email,
            password: hashPwd,
            name: name || email.split('@')[0] // Use email prefix as default name
        })

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Remove password from response
        const userResponse = {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt
        }

        return res.status(201).json({ 
            token, 
            user: userResponse,
            message: "Account created successfully!"
        })

    } catch (error) {
        console.error('SignUp error:', error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Remove password from response
        const userResponse = {
            _id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
        }

        return res.status(200).json({ 
            token, 
            user: userResponse,
            message: "Login successful!"
        })

    } catch (error) {
        console.error('Login error:', error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.json({ email: user.email, name: user.name })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.json(user)
    } catch (error) {
        console.error('Get profile error:', error)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { userLogin, userSignUp, getUser, getProfile }