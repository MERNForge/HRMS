require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',(req,res,next)=>{
  console.log('entered root ');
  next();
})
app.use('/api/v1/auth',authRoutes);

const PORT=process.env.PORT || 8000;
const startServer=async()=>{
  try {
    await connectDB();
    app.listen(PORT,()=>{
      console.log(`server is running on http://127.0.0.1:${PORT}`);
    });

  } catch (error) {
    console.log('error occured while starting server',error.message);
  }
}

startServer()
