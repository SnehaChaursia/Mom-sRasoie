const express = require("express")
const router = express.Router()
const { userLogin, userSignUp, getUser, getProfile } = require("../controller/user")
const auth = require("../middleware/auth")

router.post("/signUp", userSignUp)
router.post("/login", userLogin)
router.get("/user/:id", getUser)
router.get("/profile", auth, getProfile)

module.exports = router