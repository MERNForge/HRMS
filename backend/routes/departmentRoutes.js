const express=require('express');
const departmentController=require('../controllers/departmentController');
const protected=require('../middleware/authMiddleware')
const verifyRole=require('../middleware/roleMiddleware');


const router=express.Router();

router.post('/create',protected,verifyRole(['admin']),departmentController.createDepartment);
router.get('/',protected,verifyRole(['admin']),departmentController.getAllDepartments);
router.get('/:id',protected,verifyRole(['admin']),departmentController.getDepartmentById);

module.exports=router;
