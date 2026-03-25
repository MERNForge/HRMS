const verifyRole=(role)=>{
  return (req,res,next)=>{
    if(!role.includes(req.role))return res.status(403).json({success:false,message:"Access Denied : you don't have permission"})
    next();
  }
}
module.exports=verifyRole