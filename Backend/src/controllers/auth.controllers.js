const jwt = require('jsonwebtoken');
const UserModel = require('../models/auth.model');
const bcrypt = require('bcryptjs');

async function registerController(req, res) {
    const { username, password } = req.body;

    const IsUsernameThere = await UserModel.findOne({
        username
    })

    if (IsUsernameThere) {
        return res.status(401).json({
            message: "Username Alread Exits"
        })
    }


    const user = await UserModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token);

    res.status(201).json({
        message: "User created Succesfully",
        user
    })
}

async function loginController(req, res) {
   const {username,password} = req.body;

   const user = await UserModel.findOne({
    username
   }) 

   if(!user){
    return res.status(401).json({
        message:"User Account Not Found"
    })
   }

   const checkpass = await bcrypt.compare(password,user.password);

   if(!checkpass){
    return res.status(401).json({
        message:"Invalid Password, try again"
    })
   }

   const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET)

   res.cookie('token',token);

   res.status(201).json({
    message:"LoggedIn Succesflly!",
    user
   })
}

module.exports = {
    registerController,
    loginController
}