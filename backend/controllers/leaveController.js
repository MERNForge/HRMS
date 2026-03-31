const Leave = require('../models/Leave');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');

async function applyForLeave(req, res) {
  const { leaveType, startDate, endDate } = req.body;

  try {
    const leave = new Leave({
      employeeId: req.user,
      leaveType,
      startDate,
      endDate,
    });

    await leave.save();

    return sendSuccess(res, {
      statusCode: 201,
      data: leave,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getAllLeaves(req, res) {
  try {
    const leaves = await Leave.find().populate('employeeId', 'firstName email designation');

    return sendSuccess(res, {
      data: leaves,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getEmployeeLeaves(req, res) {
  const employeeId = req.params.id || req.user;

  try {
    const leaves = await Leave.find({ employeeId });

    return sendSuccess(res, {
      data: leaves,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function updateLeaveStatus(req, res) {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!leave) {
      return sendError(res, 404, 'leave record not found');
    }

    return sendSuccess(res, {
      data: leave,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  applyForLeave,
  getAllLeaves,
  getEmployeeLeaves,
  updateLeaveStatus,
};
