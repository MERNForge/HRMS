const User = require('../models/User');
const {
  createManagedUser,
  findConflictingUser,
  normalizeEmail,
  normalizeLoginId,
} = require('./userAccounts');

async function ensureAdminAccount() {
  const existingAdmin = await User.findOne({ role: 'admin' });

  if (existingAdmin) {
    return;
  }

  const loginId = normalizeLoginId(process.env.ADMIN_LOGIN_ID || 'ADMIN001');
  const email = normalizeEmail(process.env.ADMIN_EMAIL || 'krishOberoi0001@gmail.com');
  const password = (process.env.ADMIN_PASSWORD || 'Admin@123').trim();

  const conflictingUser = await findConflictingUser({ loginId, email });

  if (conflictingUser) {
    console.log('admin bootstrap skipped because configured loginId or email already exists');
    return;
  }

  await createManagedUser({
    name: 'Krish Oberoi',
    designation: 'Manager',
    profileRole: 'Super Admin',
    loginId,
    email,
    password,
    role: 'admin',
    joinDate: new Date('2026-02-01'),
  });

  console.log(`initial admin account created with loginId ${loginId}`);
}

module.exports = ensureAdminAccount;
