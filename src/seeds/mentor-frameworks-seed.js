const { MentorFramework } = require("../models");

const mentorFrameworkData = [
  {
    mentor_id: 1,
    framework_id: 2,
    level: "guide",
  },
  {
    mentor_id: 2,
    framework_id: 4,
    level: "master",
  },
  {
    mentor_id: 2,
    framework_id: 5,
    level: "master",
  },
  {
    mentor_id: 1,
    framework_id: 3,
    level: "guru",
  },
  {
    mentor_id: 3,
    framework_id: 1,
    level: "guru",
  },
  {
    mentor_id: 3,
    framework_id: 2,
    level: "guru",
  },
  {
    mentor_id: 3,
    framework_id: 3,
    level: "guru",
  },
];

const seedMentorFrameworks = () =>
  MentorFramework.bulkCreate(mentorFrameworkData);

module.exports = seedMentorFrameworks;
