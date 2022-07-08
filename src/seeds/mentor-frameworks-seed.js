const { MentorFramework } = require("../models");

const mentorFrameworkData = [
  {
    mentorId: 1,
    frameworkId: 2,
    level: "guide",
  },
  {
    mentorId: 2,
    frameworkId: 4,
    level: "master",
  },
  {
    mentorId: 2,
    frameworkId: 5,
    level: "master",
  },
  {
    mentorId: 1,
    frameworkId: 3,
    level: "guru",
  },
  {
    mentorId: 3,
    frameworkId: 1,
    level: "guru",
  },
  {
    mentorId: 3,
    frameworkId: 2,
    level: "guru",
  },
  {
    mentorId: 3,
    frameworkId: 3,
    level: "guru",
  },
];

const seedMentorFrameworks = () =>
  MentorFramework.bulkCreate(mentorFrameworkData);

module.exports = seedMentorFrameworks;
