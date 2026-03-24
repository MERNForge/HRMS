const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
  User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true,
  },
  firstName:{
    type:String,
    required:true,
  },
  lastName:String,
  department:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Department",
  },
  designation:{
    String:true,
    required:true,
  },
  salary:Number,
},{timestamps:true});

module.exports=mongoose.model('Employee',employeeSchema);