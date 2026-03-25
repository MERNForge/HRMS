const jwt=require('jsonwebtoken');

const generateToken=async(payload)=>{
  jwt.sign(payload,process.env.JWT_SECRET_KEY,{"expiresIn":"1d"});
};
module.exports={generateToken};