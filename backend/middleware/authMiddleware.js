const { sendError } = require('../utils/http');
const { verifyToken } = require('../utils/verifyToken');

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendError(res, 401, 'no token');
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return sendError(res, 401, 'invalid token format');
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded.userId;
    req.userId = decoded.userId;
    req.role = decoded.role;
    return next();
  } catch (error) {
    return sendError(res, 401, 'not authorized');
  }
}

module.exports = protect;
