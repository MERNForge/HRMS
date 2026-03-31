const express = require('express');
const {
  createEmployeeProfile,
  getAllEmployees,
  getEmployeeById,
} = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/create', protect, verifyRole(['hr', 'admin']), createEmployeeProfile);
router.get('/', protect, verifyRole(['admin']), getAllEmployees);
router.get('/:id', protect, verifyRole(['employee', 'hr', 'admin']), getEmployeeById);

module.exports = router;
