const Leave=require('../models/Leave');
const User=require('../models/User');

const applyForLeave=async(req,res)=>{
  const {leaveType,startDate,endDate}=req.body;
  const employeeId=req.user;//req.user will set on jwt verification,we will send employeeId with jwt on login request
  try {
    const leave=new Leave({
      employeeId,
      leaveType,
      startDate,
      endDate
    })
    await leave.save();
    res.status(201).json({success:true,data:leave}); 
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
const getAllLeaves=async(req,res)=>{
  try {
    const leaves=await Leave.find().populate('employeeId','firstName email designation');
    res.status(200).json({success:true,data:leaves});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

const getEmployeeLeaves=async(req,res)=>{
  const employeeId=req.params.id;
  try {
    const leave=await Leave.find({employeeId});
    res.status(200).json({success:true,data:leave})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

const updateLeaveStatus=async(req,res)=>{
  const employeeId=req.params.id;
  const {status}=req.body;
  try {
    const updateLeave=await Leave.findByIdAndUpdate(employeeId,{status},{new:true,runValidators:true});
    res.status(200).json({success:true,data:updateLeave});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};


module.exports={
  applyForLeave,
  getAllLeaves,
  getEmployeeLeaves,
  updateLeaveStatus
}