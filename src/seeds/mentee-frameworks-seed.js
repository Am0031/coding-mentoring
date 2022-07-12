const { MenteeFramework } = require("../models");

const menteeFrameworkData = [
  {
    menteeId: 1,
    frameworkId: 2,
    level: "Dabbler",
  },
  {
    menteeId: 2,
    frameworkId: 5,
    level: "Apprentice",
  },
  {
    menteeId: 2,
    frameworkId: 6,
    level: "Apprentice",
  },
  {
    menteeId: 1,
    frameworkId: 1,
    level: "dabbler",
  },
  {
    menteeId: 3,
    frameworkId: 8,
    level: "Practitioner",
  },
  {
    menteeId: 3,
    frameworkId: 5,
    level: "Practitioner",
  },
  {
    menteeId: 3,
    frameworkId: 3,
    level: "Practitioner",
  },
];

const seedMenteeFrameworks = () =>
  MenteeFramework.bulkCreate(menteeFrameworkData);

module.exports = seedMenteeFrameworks;
