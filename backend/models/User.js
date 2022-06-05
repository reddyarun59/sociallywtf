const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
  

    name:{
        type:String,
        required:[true, "Please add a name"]
    },

    avatar:{
        public_id:String,
        url:String,
    },

    email:{
        type:String,
        required:[true, "Please add a email"],
        unique:true
    },

    password:{
        type:String,
        required:[true, "Please add a password"]
    },

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],

    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
},{
    timestamps:true
})

module.exports=mongoose.model("User", userSchema)