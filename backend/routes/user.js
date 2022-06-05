const express=require('express')
const { registerUser, loginUser, followUser } = require('../controllers/user')
const {protect}= require('../middleware/auth')

const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/follow/:id").get(protect, followUser)

module.exports=router