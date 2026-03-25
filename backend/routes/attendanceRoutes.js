const express=require('express');
const attendanceController=require('../controllers/attendanceController');
const router=express.Router();

router.post('/check-in/:id',attendanceController.checkIn);
router.post('/check-out/:id',attendanceController.checkOut);

module.exports=router;
