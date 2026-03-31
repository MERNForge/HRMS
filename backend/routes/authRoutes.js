const express = require('express');
const {
  createEmployeeAccount,
  createHRAccount,
  deleteManagedAccount,
  getEmployeeAccounts,
  getHRAccounts,
  postLogin,
  postRegister,
  updateManagedAccount,
} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/login', postLogin);
router.post('/register', postRegister);
router.get('/hr-accounts', protect, verifyRole(['admin']), getHRAccounts);
router.get('/employee-accounts', protect, verifyRole(['admin', 'hr']), getEmployeeAccounts);
router.post('/create-hr', protect, verifyRole(['admin']), createHRAccount);
router.post('/create-employee', protect, verifyRole(['admin', 'hr']), createEmployeeAccount);
router.put('/hr-accounts/:id', protect, verifyRole(['admin']), updateManagedAccount);
router.delete('/hr-accounts/:id', protect, verifyRole(['admin']), deleteManagedAccount);

module.exports = router;
