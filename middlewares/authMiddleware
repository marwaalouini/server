const jwt = require('jsonwebtoken')


const authMidleware = async(req,res,next) =>{
    try{
const token = req.headers.token
if(!token) res.status(401).json({msg:"you are not authorized"})
else{
    const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
    if(!verifyToken) res.status(401).json({msg:"you are not authorized"})
else{
    req.body.userId = verifyToken.id
    next()
}
    
}
    }
    catch(err){
        res.status(500).json({msg:"something went wrong!",err: err.message})
    }
}

module.exports = authMidleware