const express =require('express')
const employeeController=require('../controllers/employeeController');

const router=express.Router();

router.post('/create',employeeController.createEmployeeProfile);
router.get('/',employeeController.getAllEmployees);
router.get('/:id',employeeController.getEmployeeById);

module.exports=router;