const Announcement = require('../models/Announcement');
const { handleServerError, sendError, sendSuccess } = require('../utils/http');

async function createAnnouncement(req, res) {
  const { title, content, targetRole } = req.body;

  try {
    const announcement = new Announcement({
      title,
      content,
      targetRole,
      postedBy: req.user,
    });

    await announcement.save();

    return sendSuccess(res, {
      statusCode: 201,
      data: announcement,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function getAllAnnouncements(req, res) {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    return sendSuccess(res, {
      data: announcements,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

async function deleteAnnouncement(req, res) {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return sendError(res, 404, 'Announcement not found');
    }

    return sendSuccess(res, {
      message: 'Announcement deleted',
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
};
