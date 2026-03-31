const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');

async function createPayroll(req, res) {
  const { employeeId, month, year, basicPay, hra, deductions } = req.body;

  try {
    const payroll = new Payroll({
      employeeId,
      month,
      year,
      basicPay,
      hra,
      deductions,
      netSalary: basicPay + (hra || 0) - (deductions || 0),
    });

    await payroll.save();

    return sendSuccess(res, {
      statusCode: 201,
      data: payroll,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getEmployeePayrollHistory(req, res) {
  try {
    let employeeId = req.params.id;

    if (!employeeId) {
      const employee = await Employee.findOne({ User: req.user });

      if (!employee) {
        return sendError(res, 404, 'employee profile not found');
      }

      employeeId = employee._id;
    }

    const payrolls = await Payroll.find({ employeeId }).sort({ year: -1, month: -1 });

    return sendSuccess(res, {
      data: payrolls,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  createPayroll,
  getEmployeePayrollHistory,
};
