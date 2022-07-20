const { Framework, MentorFramework, MenteeFramework } = require("../../models");

const getAllFrameworks = async (req, res) => {
  try {
    const frameworks = await Framework.findAll();
    if (!frameworks) {
      return res.status(500).json({ message: "Frameworks not found" });
    }
    return res.json(frameworks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getFrameworksByUserId = async (req, res) => {
  try {
    const { userType } = req.session;
    const userId = req.session.user.id;

    if (userType === "mentor") {
      const data = await MentorFramework.findAll({
        where: { mentorId: userId },
        attributes: ["id", "mentorId", "frameworkId", "level"],
        include: [
          {
            model: Framework,
            attributes: ["frameworkName"],
          },
        ],
      });
      if (!data) {
        return res
          .status(500)
          .json({ message: "Framework not found for that mentor" });
      }
      return res.json(data);
    } else {
      const data = await MenteeFramework.findAll({
        where: { menteeId: userId },
        attributes: ["id", "menteeId", "frameworkId", "level"],
        include: [
          {
            model: Framework,
            attributes: ["frameworkName"],
          },
        ],
      });
      if (!data) {
        return res
          .status(500)
          .json({ message: "Framework not found for that mentee" });
      }
      return res.json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const addFrameworkByUserId = async (req, res) => {
  try {
    const { userType } = req.session;
    const userId = req.session.user.id;
    const { id, frameworkId, level } = req.body;
    if (userType === "mentor") {
      const newMentorFramework = await MentorFramework.upsert({
        id: id,
        mentorId: userId,
        frameworkId,
        level,
      });
      if (!newMentorFramework) {
        return res
          .status(500)
          .json({ message: "Framework not added to mentor" });
      }
      return res.json(newMentorFramework[0]);
    } else {
      const newMenteeFramework = await MenteeFramework.upsert({
        id: id,
        menteeId: userId,
        frameworkId,
        level,
      });
      if (!newMenteeFramework) {
        return res
          .status(500)
          .json({ message: "Framework not added to mentee" });
      }
      return res.json(newMenteeFramework[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: `ERROR | ${error.message}` });
  }
};

const deleteFrameworkByUserId = async (req, res) => {
  try {
    const { userType } = req.session;
    const { id } = req.params;

    if (userType === "mentor") {
      const mentorFramework = await MentorFramework.findByPk(id);
      if (!mentorFramework) {
        return res
          .status(404)
          .json({ message: "Framework not found for this mentor" });
      }
      await MentorFramework.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: "Framework deleted for this mentor" });
    } else {
      const menteeFramework = await MenteeFramework.findByPk(id);
      if (!menteeFramework) {
        return res
          .status(404)
          .json({ message: "Framework not found for this mentee" });
      }
      await MenteeFramework.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: "Framework deleted for this mentee" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllFrameworks,
  deleteFrameworkByUserId,
  addFrameworkByUserId,
  getFrameworksByUserId,
};
