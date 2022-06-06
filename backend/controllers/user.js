const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler=require("express-async-handler");

const Post= require("../models/Post")
const User= require("../models/User")

const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error("Please add all the required fields")
    }

    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User Already Exists")
    }

    //Hash Password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //create user
    const user =await User.create({
        name,
        email,
        password:hashedPassword,
        avatar:{
            public_id:"sample-id",
            url:"sample-url",
        }
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User data")
    }
})

const loginUser=asyncHandler(async(req, res)=>{
    const { email, password }=req.body

    //Check for User Email
    const user=await User.findOne({email}).select("+password")

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

    if(user&&(await bcrypt.compare(password, user.password))){
        res.status(201).cookie("token",generateToken(user.id),options).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }

})

const updateProfile = asyncHandler(async(req, res)=>{

    const user = await User.findById(req.user.id)

    const {name, email}=req.body

    if(name){
        user.name = name
    }

    if(email){
        user.email=email
    }

    await user.save()

    res.status(201).json({
        message:"Profile updated successfully"
    })
})

const followUser=asyncHandler(async(req, res)=>{

    const userToFollow = await User.findById(req.params.id)
    const loggedInUser = await User.findById(req.user.id)

    if(!userToFollow){
        res.status(404)
        throw new Error("User not found")
    }

    if(loggedInUser.following.includes(userToFollow.id)){

        const indexFollowing=loggedInUser.following.indexOf(userToFollow.id)
        loggedInUser.following.splice(indexFollowing, 1)

        const indexFollowers=userToFollow.followers.indexOf(loggedInUser.id)
        userToFollow.followers.splice(indexFollowers,1)

        await loggedInUser.save()
        await userToFollow.save()
        
        res.status(201).json({message:"user Unfollowed"})
    }else{

        loggedInUser.following.push(userToFollow.id)
        userToFollow.followers.push(loggedInUser.id)

        await loggedInUser.save()
        await userToFollow.save()

        res.status(201).json({message:"User Followed"})
    }

})

const myProfile = asyncHandler(async (req, res) => {

      const user = await User.findById(req.user.id).populate(
        "posts followers following"
      );
  
      res.status(200).json({
        success: true,
        user,
      });
    })

const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id).populate(
        "posts followers following"
    );
      
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }
      
    res.status(200).json({
        success: true,
        user,
    });
})

const getAllUsers = asyncHandler(async (req, res) => {

      const users = await User.find({
        name: { $regex: req.query.name, $options: "i" },
      });
  
      res.status(200).json({
        success: true,
        users,
      });

  });
  

//generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"30d"
    })
}


module.exports ={
    registerUser,
    loginUser,
    followUser,
    updateProfile,
    myProfile,
    getUserProfile,
    getAllUsers,
}