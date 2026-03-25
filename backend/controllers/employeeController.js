const Employee=require('../models/Employee');
const User=require('../models/User');

const createEmployeeProfile=async(req,res)=>{
  const {userId,firstName,lastName,designation,salary,department}=req.body;
  try {
    const user=await User.findById(userId);
    if(!user)return res.status(404).json({success:false,message:"user not found"});
    const employee=await Employee.findOne({User:userId});
    if(employee)return res.status(400).json({message:"employee already exists"});
    const newEmployee=new Employee({
      User:userId,
      firstName,
      lastName,
      Department:department,
      designation,
      salary
    });
    await newEmployee.save();
    res.status(201).json({success:true,data:newEmployee});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};

const getAllEmployees=async(req,res)=>{
  try {
    const employees=await Employee.find().populate("User","email role isActive").populate('Department','name')
    if(employees.length===0)return res.json({success:false,message:"no employees"});
    res.json({success:true,data:employees});
  } catch (error) {
    res.json({success:false,message:error.message});
  }
}

const getEmployeeById=async(req,res)=>{
  const _id=req.params.id;
  if(req.role!=='admin' && req.user!==_id)return res.status(403).json({success:false,message:"forbidden : you don't have permission"})
  try {
    const employee=await Employee.findById(_id);
    if(!employee)return res.status(404).json({success:false,message:"employee not found"});
    res.json({success:true,data:employee});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

module.exports={
  createEmployeeProfile,
  getAllEmployees,
  getEmployeeById
}