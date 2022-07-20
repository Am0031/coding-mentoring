const { Partnership, Mentor } = require("../../models");

const createPartnership = async (req, res) => {
  try {
    const menteeId = req.session.user.id;
    const { mentorId } = req.body;
    const projectName = `Partnership ${mentorId} - ${menteeId}`;

    const partnership = await Partnership.create({
      mentorId,
      menteeId,
      projectName,
    });

    return res.json({
      message: "Partnership successfully created",
      partnership: partnership,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `[ERROR]: Failed to create partnership | ${error.message}`,
    });
  }
};

const getPartnershipsByMenteeId = async (req, res) => {
  try {
    const { id } = req.session.user;
    const partnerships = await Partnership.findAll({
      where: { menteeId: id },
      include: [
        {
          model: Mentor,
          attributes: ["id", "username"],
        },
      ],
    });

    return res.json(partnerships);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createPartnership,
  getPartnershipsByMenteeId,
};
