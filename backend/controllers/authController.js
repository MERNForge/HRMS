const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');
const {
  createManagedUser,
  findUserByIdentifier,
  getIsActiveFromStatus,
  sanitizeUser,
  updateManagedUser,
} = require('../utils/userAccounts');

function buildAuthPayload(user) {
  return {
    userId: user._id,
    role: user.role,
  };
}

function getManagedAccountInput(body) {
  const { loginId, email, password, name, designation, profileRole, status, joinDate } = body;

  return {
    loginId,
    email,
    password,
    name,
    designation,
    profileRole,
    isActive: getIsActiveFromStatus(status, undefined),
    joinDate,
  };
}

async function postLogin(req, res) {
  const identifier = req.body.identifier || req.body.loginId || req.body.email;
  const { password } = req.body;

  if (!identifier || !password) {
    return sendError(res, 400, 'identifier and password are required');
  }

  try {
    const user = await findUserByIdentifier(identifier);

    if (!user) {
      return sendError(res, 404, 'user not found');
    }

    if (!user.isActive) {
      return sendError(res, 403, 'account is inactive');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return sendError(res, 400, 'invalid credentials');
    }

    const token = generateToken(buildAuthPayload(user));

    return sendSuccess(res, {
      data: sanitizeUser(user),
      extra: { token },
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function createHRAccount(req, res) {
  try {
    const user = await createManagedUser({
      ...getManagedAccountInput(req.body),
      role: 'hr',
      createdBy: req.userId,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'HR account created successfully',
      data: sanitizeUser(user),
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function createEmployeeAccount(req, res) {
  try {
    const user = await createManagedUser({
      ...getManagedAccountInput(req.body),
      role: 'employee',
      createdBy: req.userId,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Employee account created successfully',
      data: sanitizeUser(user),
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

function postRegister(req, res) {
  return sendError(
    res,
    403,
    'Public registration is disabled. Admin creates HR accounts and HR/Admin create employee accounts.'
  );
}

async function getHRAccounts(req, res) {
  try {
    const users = await User.find({ role: { $in: ['admin', 'hr'] } }).sort({ createdAt: 1 });

    return sendSuccess(res, {
      data: users.map((user) => sanitizeUser(user)),
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getEmployeeAccounts(req, res) {
  try {
    const users = await User.find({ role: 'employee' }).sort({ createdAt: -1 });

    return sendSuccess(res, {
      data: users.map((user) => sanitizeUser(user)),
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function updateManagedAccount(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !['admin', 'hr'].includes(user.role)) {
      return sendError(res, 404, 'Profile not found');
    }

    const updatedUser = await updateManagedUser(user, getManagedAccountInput(req.body));

    return sendSuccess(res, {
      message: 'Profile updated successfully',
      data: sanitizeUser(updatedUser),
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function deleteManagedAccount(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !['admin', 'hr'].includes(user.role)) {
      return sendError(res, 404, 'Profile not found');
    }

    if (String(user._id) === String(req.userId)) {
      return sendError(res, 400, 'You cannot delete your current account');
    }

    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });

      if (adminCount <= 1) {
        return sendError(res, 400, 'You cannot delete the last admin account');
      }
    }

    await User.findByIdAndDelete(req.params.id);

    return sendSuccess(res, {
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  postLogin,
  postRegister,
  createHRAccount,
  createEmployeeAccount,
  getHRAccounts,
  getEmployeeAccounts,
  updateManagedAccount,
  deleteManagedAccount,
};
