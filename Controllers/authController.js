const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { model } = require("mongoose");

const register = async(req,res) =>{
    const {username,password} = req.body
    try {
         const hashedPassword = await bcrypt.hash(password,10)
         const  user = new User({username,password :hashedPassword});
         await user.save();
         res.status(201).json({message :"Registered Successfully"});

    } catch (error) {
        res.status(500).json({message : "Failed to register user ", error : error.message});
    }
}
const login = async (req,res) =>{
    const {username,password} = req.body;

    try {
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json({message :"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!user){
            res.status(401).json({message:"Invalid password..Try again"});
        }
        // Genarate Web Tocken
        const token = jwt.sign({user},"secret")
        res.json({token})
        console.log(token);
        console.log(req.body);
    } catch (error) {
        res.status(500).json({message:"Login failed..", error: error.message})
    };
};

module.exports={register,login}