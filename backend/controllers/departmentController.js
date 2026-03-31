const Department = require('../models/Department');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');

async function createDepartment(req, res) {
  const { name, description } = req.body;

  try {
    const existingDepartment = await Department.findOne({ name });

    if (existingDepartment) {
      return sendError(res, 400, 'department already exists');
    }

    const department = new Department({
      name,
      description,
    });

    await department.save();

    return sendSuccess(res, {
      statusCode: 201,
      data: department,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find();

    return sendSuccess(res, {
      data: departments,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getDepartmentById(req, res) {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return sendError(res, 404, 'department not found');
    }

    return sendSuccess(res, {
      data: department,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
};
