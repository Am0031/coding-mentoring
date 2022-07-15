const { Partnership, Mentor } = require("../../models");

const createPartnership = async (req, res) => {
  try {
    const menteeId = req.session.user.id;
    const { mentorId, projectName } = req.body;

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
    console.log(`[ERROR]: Failed to create partnership | ${error.message}`);

    return res.status(500).json({ success: false });
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
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

module.exports = {
  createPartnership,
  getPartnershipsByMenteeId,
};
