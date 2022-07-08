const { Partnership } = require("../models");

const partnershipData = [
  {
    mentorId: 1,
    menteeId: 1,
    projectName: "front-end practice",
  },
  {
    mentorId: 2,
    menteeId: 2,
    projectName: "CLI with node",
  },
  {
    mentorId: 3,
    menteeId: 1,
    projectName: "javascript practice",
  },
];

const seedPartnerships = () => Partnership.bulkCreate(partnershipData);

module.exports = seedPartnerships;
