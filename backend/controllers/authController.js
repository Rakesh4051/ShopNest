const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");

require("dotenv").config();
// function for token
const generationToken = (id) =>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:'30d'}
    );
}

// register a new user
const registerUser = async(req ,res ) =>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            })
        }
        //  Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        //todos:OTP sending and verification for email confirmation
        //todos: welcome mail send;
        const user = await  User.create({name,email,password:hashedPassword});
        if(user){
            const otp = Math.floor(100000 + Math.random()*900000).toString();
            const message = `Welcome to ShopNest,${name} your OTP for ShopNest registration is: ${otp}`;
            await sendEmail(email,'Welcome to ShopNest-Your OTP for Registration',message)
        
            // generating token jwt
            res.status(201).json({
                message:"New User created successfully",
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generationToken(user._id)
            })
        }
        else{
            res.status(500).json({message:"server error"})
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User not created",
            error:error.message,
        })
    }
}

// login function handler

const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generationToken(user._id)
            })
        }else{
            return res.status(400).json({message:'Invalid email or password'})
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User not found",
            error:error.message,
        });
    };
};

// getUsers funcion handler

const getUsers = async(req,res) =>{
    try{
        const users = await User.find({}).select('-password');
        res.json(users);
    }
    catch(error){
        res.status(500).json({message:'Server error'})
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUsers
}
 