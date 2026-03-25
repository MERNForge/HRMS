const express =require('express')
const employeeController=require('../controllers/employeeController');
const protected=require('../middleware/authMiddleware')
const verifyRole=require('../middleware/roleMiddleware');

const router=express.Router();

router.post('/create',protected,verifyRole(['employee','hr','admin']),employeeController.createEmployeeProfile);
router.get('/',protected,verifyRole(['admin']),employeeController.getAllEmployees);
router.get('/:id',protected,verifyRole(['employee','hr','admin']),employeeController.getEmployeeById);

module.exports=router;