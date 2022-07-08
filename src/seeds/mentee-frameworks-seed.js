const { MenteeFramework } = require("../models");

const menteeFrameworkData = [
  {
    mentee_id: 1,
    framework_id: 2,
    level: "Dabbler",
  },
  {
    mentee_id: 2,
    framework_id: 5,
    level: "Apprentice",
  },
  {
    mentee_id: 2,
    framework_id: 6,
    level: "Apprentice",
  },
  {
    mentee_id: 1,
    framework_id: 1,
    level: "dabbler",
  },
  {
    mentee_id: 3,
    framework_id: 8,
    level: "Practitioner",
  },
  {
    mentee_id: 3,
    framework_id: 5,
    level: "Practitioner",
  },
  {
    mentee_id: 3,
    framework_id: 3,
    level: "Practitioner",
  },
];

const seedMenteeFrameworks = () =>
  MenteeFramework.bulkCreate(menteeFrameworkData);

module.exports = seedMenteeFrameworks;
