const Attendance=require('../models/Attendance');
const Leave = require('../models/Leave');
const User=require('../models/User');
// const {checkInTime,checkOutTime,hours}=require('../utils/attendanceTime')

const checkIn=async(req,res)=>{
  const userId=req.params.id;
  const today=new Date().setHours(0,0,0,0);
  try {
    const exitingRecord=await Attendance.findOne({employeeId:userId,date:today});
    if(exitingRecord)return res.status(400).json({success:false,message:"already checked In for today"});
    const newRecord=new Attendance({
      employeeId:userId,
      date:today,
      checkIn:new Date()
    })
    await newRecord.save()
    res.status(200).json({success:true,data:newRecord});
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }

}

const checkOut=async(req,res)=>{
  const userId=req.params.id;
  const today=new Date().setHours(0,0,0,0);

  try{
    const attendance=await Attendance.findOne({employeeId:userId,date:today});
    if(!attendance)return res.status(404).json({success:false,message:"no check-In record found for today"});
    if(attendance.checkOut)return res.status(400).json({success:false,message:"check-out already marked for today"});
    attendance.checkOut=new Date();
    const hours=((attendance.checkOut-attendance.checkIn)/(1000*60*60)).toFixed(2);
    attendance.workingHours=hours;
    await attendance.save();
    res.status(200).json({success:true,data:attendance})
  }catch(error){
    res.status(500).json({success:false,message:error.message});
  }
};

module.exports={
  checkIn,
  checkOut
}