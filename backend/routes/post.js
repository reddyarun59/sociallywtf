const express=require('express')
const { createPost, likeAndUnlikePost, deletePost } = require('../controllers/post')
const {protect}=require('../middleware/auth')

const router=express.Router()

router.route("/post/create-post").post(protect,createPost)
router.route("/post/:id").get(protect,likeAndUnlikePost).delete(protect, deletePost)

module.exports=router