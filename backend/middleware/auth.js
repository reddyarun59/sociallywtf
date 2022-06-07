const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

const protect=asyncHandler(async(req, res, next)=>{
    
    
    try {

        const cookies = req.headers.cookie;
        const token = cookies.split(" ")[1];

            //Get token from Header
            //token=req.headers.authorization.split(" ")[1]

            //Verify token
            // const decoded= jwt.verify(token, process.env.JWT_SECRET)

            // //Get user from the token
            // req.user=await User.findById(decoded.id)

            jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
                if (err) {
                  return res.status(400).json({ message: "Invalid TOken" });
                }
                //console.log(user.id);
                req.id = user.id;
              });
              next();

            //next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports ={protect}