const mongoose=require('mongoose');

const attendanceSchema=new mongoose.Schema({
  employeeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true,
  },
  date:{
    type:Date,
    required:true,
  },
  checkIn:Date,
  checkOut:Date,
  workingHours:Number,
},{timestamps:true})

module.exports=mongoose.model("Attendance",attendanceSchema);