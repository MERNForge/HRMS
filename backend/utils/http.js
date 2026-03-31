function sendSuccess(res, { statusCode = 200, data, message, extra = {} } = {}) {
  const body = {
    success: true,
    ...extra,
  };

  if (typeof data !== 'undefined') {
    body.data = data;
  }

  if (message) {
    body.message = message;
  }

  return res.status(statusCode).json(body);
}

function sendError(res, statusCode, message, extra = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...extra,
  });
}

function createHttpError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function handleServerError(res, error, fallbackMessage = 'Internal server error') {
  return sendError(res, error.statusCode || 500, error.message || fallbackMessage);
}

module.exports = {
  sendSuccess,
  sendError,
  createHttpError,
  handleServerError,
};
