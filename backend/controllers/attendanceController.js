const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');

async function getEmployeeProfile(userId) {
  return Employee.findOne({ User: userId });
}

function getTodayStart() {
  return new Date().setHours(0, 0, 0, 0);
}

async function checkIn(req, res) {
  try {
    const employee = await getEmployeeProfile(req.user);

    if (!employee) {
      return sendError(res, 404, 'employee profile not found');
    }

    const today = getTodayStart();
    const existingRecord = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    if (existingRecord) {
      return sendError(res, 400, 'already checked In for today');
    }

    const attendance = new Attendance({
      employeeId: employee._id,
      date: today,
      checkIn: new Date(),
    });

    await attendance.save();

    return sendSuccess(res, {
      data: attendance,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function checkOut(req, res) {
  try {
    const employee = await getEmployeeProfile(req.user);

    if (!employee) {
      return sendError(res, 404, 'employee profile not found');
    }

    const today = getTodayStart();
    const attendance = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    if (!attendance) {
      return sendError(res, 404, 'no check-In record found for today');
    }

    if (attendance.checkOut) {
      return sendError(res, 400, 'check-out already marked for today');
    }

    attendance.checkOut = new Date();
    attendance.workingHours = ((attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60)).toFixed(2);

    await attendance.save();

    return sendSuccess(res, {
      data: attendance,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  checkIn,
  checkOut,
};
