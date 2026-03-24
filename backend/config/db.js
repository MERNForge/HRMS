const mongoose=require('mongoose');

const MONGO_URI=process.env.MONGO_URI;

const connectDB=async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connected');
  } catch (error) {
    console.log('error occured while connecting to db ',error.message);
    process.exit(1);
  }
}
module.exports=connectDB;