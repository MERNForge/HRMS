const { sendError } = require('../utils/http');

function verifyRole(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return sendError(res, 403, "Access Denied : you don't have permission");
    }

    return next();
  };
}

module.exports = verifyRole;
