const Employee = require('../models/Employee');
const User = require('../models/User');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');

async function createEmployeeProfile(req, res) {
  const { userId, firstName, lastName, designation, salary, department } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return sendError(res, 404, 'user not found');
    }

    if (user.role !== 'employee') {
      return sendError(res, 400, 'profile can only be created for employee accounts');
    }

    const existingEmployee = await Employee.findOne({ User: userId });

    if (existingEmployee) {
      return sendError(res, 400, 'employee already exists');
    }

    const employee = new Employee({
      User: userId,
      firstName,
      lastName,
      Department: department,
      designation,
      salary,
    });

    await employee.save();

    return sendSuccess(res, {
      statusCode: 201,
      data: employee,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find()
      .populate('User', 'loginId email role isActive')
      .populate('Department', 'name');

    return sendSuccess(res, {
      data: employees,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('User', 'loginId email role isActive')
      .populate('Department', 'name');

    if (!employee) {
      return sendError(res, 404, 'employee not found');
    }

    if (req.role === 'employee' && employee.User?._id?.toString() !== req.userId) {
      return sendError(res, 403, "forbidden : you don't have permission");
    }

    return sendSuccess(res, {
      data: employee,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  createEmployeeProfile,
  getAllEmployees,
  getEmployeeById,
};
