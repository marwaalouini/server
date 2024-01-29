const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
app.use(cors())
//json config
app.use(express.json())

// config database
const connectDB = require("./config/connectDB")
connectDB()

//routes
app.use("/api",require("./routes/userRoutes"))


//port config
const port = process.env.PORT || 8081
app.listen(port,(err)=> err ? console.log(err) : console.log("server is running on port :",port))