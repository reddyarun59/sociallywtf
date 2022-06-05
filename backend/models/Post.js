const mongoose = require('mongoose')

const postSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    caption:String,

    image:{
        public_id:String,
        url:String,
    },

    createdAt:{
        type:Date,
        default:Date.now
    },

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]


},{
    timestamps:true,
})

module.exports=mongoose.model("Post", postSchema)