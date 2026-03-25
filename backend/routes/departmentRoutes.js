const express=require('express');
const departmentController=require('../controllers/departmentController');

const router=express.Router();

router.post('/create',departmentController.createDepartment);
router.get('/',departmentController.getAllDepartments);
router.get('/:id',departmentController.getDepartmentById);

module.exports=router;
