const express=require('express')
const { registerUser, loginUser, followUser, updateProfile, myProfile, getUserProfile, getAllUsers } = require('../controllers/user')
const {protect}= require('../middleware/auth')

const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/follow/:id").get(protect, followUser)
router.route("/profile/update").put(protect, updateProfile)
router.route("/me").get(protect, myProfile)
router.route("/user/:id").get(protect,getUserProfile)
router.route("/users").get(protect,getAllUsers)

module.exports=router