const asyncHandler=require("express-async-handler");
const Post= require("../models/Post")
const User= require("../models/User")

const createPost=asyncHandler(async(req, res)=>{

    const post=await Post.create({
        caption:req.body.caption,
        image:{
            public_id:"req.body.public_id",
            url:"req.body.url",
        },
        user:req.user.id
    })

    const user=await User.findById(req.user.id)

    user.posts.push(post.id)
    await user.save()

    res.status(201).json(post)

})

const deletePost = asyncHandler(async(req, res)=>{

    const post=await Post.findById(req.params.id)

    if(!post){
        res.status(404)
        throw new Error("Post not found")
    }

    if(post.user.toString()!==req.user.id.toString()){
        res.status(404)
        throw new Error("UnAuthorized, you are not allowed to delete this post")
    }

    await post.remove()

    const user = await User.findById(req.user.id)
    const index=await user.posts.indexOf(req.params.id)

    user.posts.splice(index,1)

    await user.save()

    res.status(201).json({
        message:"Post Deleted"
    })

})

const likeAndUnlikePost=asyncHandler(async(req, res)=>{
    
    const post=await Post.findById(req.params.id)

    if(!post){
        res.status(404)
        throw new Error(" Post not found")
    }

    if(post.likes.includes(req.user.id)){

        const index=post.likes.indexOf(req.user.id)

        post.likes.splice(index, 1)
        await post.save()

        res.status(201).json({
            message: 'Post unliked'
        })
    }else{

        post.likes.push(req.user.id)
    
        post.save()

        res.status(201).json({
            message: 'Post Liked'
        })
    }

})

const getPostsOfFollowing=asyncHandler(async(req, res)=>{
    
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
        user:{
            $in:user.following
        }
    })

    res.status(201).json({
        posts
    })
})

const updateCaption=asyncHandler(async(req, res)=>{

    const post=await Post.findById(req.params.id)

    if(!post){
        res.status(404)
        throw new Error("Post not found")
    }

    if(post.user.toString()!==req.user.id.toString()){
        res.status(404)
        throw new Error("UnAuthorized, you are not allowed to edit this post")
    }

    post.caption=await req.body.caption

    await post.save()

    res.status(201).json({
        message:"Post updated successfully",
    })
})

const commentOnPost = async (req, res) => {

    const post = await Post.findById(req.params.id);
  
    if (!post) {
        res.status(404)
        throw new Error("Post Not Found")
    }
      
    post.comments.push({
        user: req.user.id,
        comment: req.body.comment,
    });
  
    await post.save();
    
    res.status(200).json({
        success: true,
        message: "Comment added",
    }); 
  };

const deleteComment = asyncHandler(async (req, res) => {
    
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      // Checking If owner wants to delete
  
      if (post.user.toString() === req.user.id.toString()) {
        if (req.body.commentId === undefined) {
          return res.status(400).json({
            success: false,
            message: "Comment Id is required",
          });
        }
  
        post.comments.forEach((item, index) => {
          if (item.id.toString() === req.body.commentId.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Selected Comment has deleted",
        });
      } else {
        post.comments.forEach((item, index) => {
          if (item.user.toString() === req.user.id.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Your Comment has deleted",
        });
      
      }
  })

  

module.exports={
    createPost,
    likeAndUnlikePost,
    deletePost,
    getPostsOfFollowing,
    updateCaption,
    commentOnPost,
    deleteComment,
}