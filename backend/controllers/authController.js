const User=require('../models/User');
const bcrypt=require('bcryptjs');
const {generateToken} = require('../utils/generateToken');

const postLogin=async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await User.findOne({email});
    if(!user) return res.status(404).json({success:false,message:"user not found"});
    const pass=await bcrypt.compare(password,user.password);
    if(!pass)return res.status(400).json({success:false,message:"invalid credentials"});
    const payload={
      userId:user._id,
      role:user.role
    }
    const token=generateToken(payload);
    res.status(200).json({success:true,data:user,token});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};

const postRegister=async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await User.findOne({email});
    if(user)return res.status(400).json({success:false,message:"email already registered"});
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    const payload={
      userId:newUser._id,
      role:newUser.role
    }
    const token=generateToken(payload);
    res.status(201).json({success:true,data:newUser,token});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};

module.exports={
  postLogin,
  postRegister,
}