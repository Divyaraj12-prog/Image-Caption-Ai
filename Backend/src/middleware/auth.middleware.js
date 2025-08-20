const jwt = require('jsonwebtoken');
const UserModel = require('../models/auth.model');

async function authMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized User, Please Log In And Try Again!"
        })
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        const user = await UserModel.findOne({
            _id: decode.id
        })

        req.user = user;
        next();
    }catch(err){
        res.status(401).json({
            message:"Unauthorized User"
        })
    }
}

module.exports = authMiddleware;