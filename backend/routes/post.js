const express=require('express')
const { createPost, likeAndUnlikePost, deletePost, getPostsOfFollowing, updateCaption, commentOnPost, deleteComment } = require('../controllers/post')
const {protect}=require('../middleware/auth')

const router=express.Router()

router.route("/post/create-post").post(protect,createPost)
router.route("/post/:id").get(protect,likeAndUnlikePost).put(protect, updateCaption).delete(protect, deletePost).post(protect, commentOnPost)
router.route("/posts").get(getPostsOfFollowing)
router.route("/post/comment/:id").delete(protect, deleteComment)
module.exports=router