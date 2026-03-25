const jwt=require('jsonwebtoken');

const verifyToken=async(token)=>{
  jwt.verify(token,process.env.JWT_SECRET_KEY)
}
module.exports={verifyToken}