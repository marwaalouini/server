const express = require ("express")
const router=express.Router()
const{register,login,getUserData}= require("../controllers/userControllers")


router.post("/register",register)
router.post("/login",login)
router.get("/data",getUserData)


module.exports= router 