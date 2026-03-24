const User=require('../models/User');
const bcrypt=require('bcryptjs');

const postLogin=async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await User.findOne({email});
    if(!email)return res.status(404).json({success:false,message:"user not found"});
    const pass=await bcrypt.compare(password,user.password);
    if(!pass)return res.status(400).json({success:false,message:"invalid credentials"});
    res.status(200).json({success:true,data:user});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

const postRegister=async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await User.findOne({email});
    if(user)return res.status(400).json({success:false,message:"email already registered"});
    const newUser=new User.create({
      email,
      password,
    });
    res.status(201).json({success:true,data:newUser});
  } catch (error) {
    res.status(500).jsn({message:error.message});
  }
};

module.exports={
  postLogin,
  postRegister,
}