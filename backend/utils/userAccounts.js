const User = require('../models/User');
const { createHttpError } = require('./http');

function sanitizeUser(userDoc) {
  const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete user.password;
  return user;
}

function normalizeLoginId(loginId) {
  return loginId?.trim()?.toUpperCase() || '';
}

function normalizeEmail(email) {
  return email?.trim()?.toLowerCase() || '';
}

function normalizeJoinDate(value) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function getIsActiveFromStatus(status, fallbackValue) {
  if (!status) {
    return fallbackValue;
  }

  return status === 'Active';
}

async function findUserByIdentifier(rawIdentifier) {
  const identifier = rawIdentifier?.trim();

  if (!identifier) {
    return null;
  }

  return User.findOne({
    $or: [{ loginId: identifier.toUpperCase() }, { email: identifier.toLowerCase() }],
  });
}

function buildDuplicateUserQuery(loginId, email) {
  const duplicateQuery = [];

  if (loginId) {
    duplicateQuery.push({ loginId });
  }

  if (email) {
    duplicateQuery.push({ email });
  }

  return duplicateQuery;
}

async function findConflictingUser({ loginId, email, excludeUserId }) {
  const normalizedLoginId = normalizeLoginId(loginId);
  const normalizedEmail = normalizeEmail(email);
  const duplicateQuery = buildDuplicateUserQuery(normalizedLoginId, normalizedEmail);

  if (duplicateQuery.length === 0) {
    return null;
  }

  const query = { $or: duplicateQuery };

  if (excludeUserId) {
    query._id = { $ne: excludeUserId };
  }

  return User.findOne(query);
}

async function createManagedUser({
  loginId,
  email,
  password,
  role,
  createdBy,
  name,
  designation,
  profileRole,
  isActive,
  joinDate,
}) {
  const normalizedLoginId = normalizeLoginId(loginId);
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedLoginId || !password?.trim()) {
    throw createHttpError('loginId and password are required', 400);
  }

  const conflictingUser = await findConflictingUser({
    loginId: normalizedLoginId,
    email: normalizedEmail,
  });

  if (conflictingUser) {
    throw createHttpError('loginId or email already registered', 409);
  }

  const user = new User({
    name: name?.trim() || undefined,
    designation: designation?.trim() || undefined,
    profileRole: profileRole?.trim() || undefined,
    loginId: normalizedLoginId,
    email: normalizedEmail || undefined,
    password: password.trim(),
    role,
    createdBy,
    isActive: typeof isActive === 'boolean' ? isActive : undefined,
    joinDate: normalizeJoinDate(joinDate),
  });

  await user.save();
  return user;
}

async function updateManagedUser(
  user,
  { loginId, email, password, name, designation, profileRole, isActive, joinDate }
) {
  const nextLoginId = normalizeLoginId(loginId);
  const nextEmail = normalizeEmail(email);

  if (!nextLoginId) {
    throw createHttpError('Employee ID is required', 400);
  }

  const conflictingUser = await findConflictingUser({
    loginId: nextLoginId,
    email: nextEmail,
    excludeUserId: user._id,
  });

  if (conflictingUser) {
    throw createHttpError('loginId or email already registered', 409);
  }

  user.name = name?.trim() || undefined;
  user.designation = designation?.trim() || undefined;
  user.loginId = nextLoginId;
  user.email = nextEmail || undefined;
  user.joinDate = normalizeJoinDate(joinDate) || undefined;

  if (typeof isActive === 'boolean') {
    user.isActive = isActive;
  }

  user.profileRole = user.role === 'admin' ? 'Super Admin' : profileRole?.trim() || undefined;

  if (password?.trim()) {
    user.password = password.trim();
  }

  await user.save();
  return user;
}

module.exports = {
  sanitizeUser,
  normalizeLoginId,
  normalizeEmail,
  normalizeJoinDate,
  getIsActiveFromStatus,
  findUserByIdentifier,
  findConflictingUser,
  createManagedUser,
  updateManagedUser,
};
