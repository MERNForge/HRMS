const mongoose=require('mongoose');

const payrollSchema=new mongoose.Schema({
  employeeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required:true,
    index:true,
  },
  month:Number,
  year:Number,
  basicPay:Number,
  hra:Number,
  deductions:Number,
  netSalary:Number,
},{timestamp:true});

module.exports=mongoose.model("Payroll",payrollSchema);