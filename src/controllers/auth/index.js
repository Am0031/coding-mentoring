const { Mentor, Mentee } = require("../../models");

const login = async (req, res) => {
  try {
    let user;

    const { email, password, userType } = req.body;

    if (userType === "mentor") {
      user = await Mentor.findOne({ where: { email } });

      if (!user) {
        console.log(
          `[ERROR]: Failed to login | No mentor with email address of ${email}`
        );

        return res.status(500).json({ success: false });
      }
    }

    if (userType === "mentee") {
      user = await Mentee.findOne({ where: { email } });

      if (!user) {
        console.log(
          `[ERROR]: Failed to login | No mentee with email address of ${email}`
        );

        return res.status(500).json({ success: false });
      }
    }

    const isAuthorised = await user.checkPassword(password);

    if (isAuthorised) {
      req.session.save(() => {
        req.session.isLoggedIn = true;
        req.session.user = user.getUser();
        req.session.userType = userType;
        return res.json({ success: true });
      });
    } else {
      console.log(
        `[ERROR]: Failed to login | Incorrect password for email: ${email}`
      );
      return res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const mentorSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      location,
      availability,
      collaborationFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl,
    } = req.body;

    const mentor = await Mentor.findOne({ where: { email } });

    if (mentor) {
      console.log(
        `[ERROR]: Failed to create mentor | Email address of ${email} already exists as a mentor`
      );

      return res.status(500).json({ success: false });
    }

    const data = await Mentor.create({
      firstName,
      lastName,
      username,
      email,
      password,
      location,
      availability,
      collaborationFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create mentor | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const menteeSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      location,
      availability,
      collaborationFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl,
    } = req.body;

    const mentee = await Mentee.findOne({ where: { email } });

    if (mentee) {
      console.log(
        `[ERROR]: Failed to create mentee | Email address of ${email} already exists as a mentee`
      );

      return res.status(500).json({ success: false });
    }

    const data = await Mentee.create({
      firstName,
      lastName,
      username,
      email,
      password,
      location,
      availability,
      collaborationFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create mentee | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const signup = (req, res) => {
  const { userType } = req.body;

  if (userType === "mentor") {
    return mentorSignup(req, res);
  }

  if (userType === "mentee") {
    return menteeSignup(req, res);
  }
};

const logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } else {
    return res.status(404).end();
  }
};

module.exports = { login, signup, menteeSignup, mentorSignup, logout };
