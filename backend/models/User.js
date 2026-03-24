const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:['admin','employee','hr'],
    default:'employee'
  },
  isActive:{
    type:Boolean,
    default:true,
  }
},{timestamps:true});
userSchema.pre('save',async function (next) {
  if(!this.isModified("password"))return;
  this.password=await bcrypt.hash(this.password,12)//hashing password using bcrypt before saving into db with pre hook
})

module.exports=mongoose.model('User',userSchema);