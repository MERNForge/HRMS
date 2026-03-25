const express=require('express');
const leaveController=require('../controllers/leaveController');
const protected=require('../middleware/authMiddleware')
const verifyRole=require('../middleware/roleMiddleware')

const router=express.Router();

router.post('/apply',protected,verifyRole(['employee','admin','hr']),leaveController.applyForLeave);
router.get('/',protected,verifyRole(['employee','admin','hr']),leaveController.getAllLeaves);
router.get('/employee/:id',protected,verifyRole(['employee','admin','hr']),leaveController.getEmployeeLeaves);
router.put('/:id/status',protected,verifyRole(['admin','hr']),leaveController.updateLeaveStatus);


module.exports=router;
