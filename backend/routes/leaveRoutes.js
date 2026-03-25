const express=require('express');
const leaveController=require('../controllers/leaveController');

const router=express.Router();

router.post('/apply',leaveController.applyForLeave);
router.get('/',leaveController.getAllLeaves);
router.get('/employee/:id',leaveController.getEmployeeLeaves);
router.put('/:id/status',leaveController.updateLeaveStatus);


module.exports=router;