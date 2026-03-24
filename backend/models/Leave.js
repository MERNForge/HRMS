const mongoose=require('mongoose')

const leaveSchema=new mongoose.Schema({
  employeeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Employee",
  },
  leaveType:{
    type:String,
    enum:["sick","casual","paid"],
    required:true,
  },
  startDate:Date,
  endDate:Date,
  status:{
    type:String,
    enum:["pending","approved","rejected"],
    default:"pending",
  }
},{timestamps:true});

module.exports=mongoose.model("Leave",leaveSchema);