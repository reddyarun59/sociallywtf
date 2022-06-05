const express = require('express')
const {connectDB}= require('./config/db')
//const post = require("./routes/post")
const {errorHandler} = require("./middleware/error")
const dotenv = require('dotenv').config()


connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.use("/api/v1", require("./routes/post"))
app.use("/api/v1", require("./routes/user"))

app.use(errorHandler)

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})