const express = require("express")
const app = express()
require("dotenv").config()
const connectDb = require("./config/connectionDb")
const cors = require("cors")
const path = require("path")

const PORT = process.env.PORT || 5000

// Debug: Check if JWT_SECRET is loaded
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET)
console.log('CONNECTION_STRING:', process.env.CONNECTION_STRING)

// Connect to database
connectDb()

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))

// Serve static files
app.use(express.static("public"))
app.use('/images', express.static(path.join(__dirname, 'public/images')))

// Routes
app.use("/", require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err)
        return
    }
    console.log(`Server is running on port ${PORT}`)
})