const { Partnership } = require("../models");

const partnershipData = [
  {
    mentor_id: 1,
    mentee_id: 1,
    project_name: "front-end practice",
  },
  {
    mentor_id: 2,
    mentee_id: 2,
    project_name: "CLI with node",
  },
  {
    mentor_id: 3,
    mentee_id: 1,
    project_name: "javascript practice",
  },
];

const seedPartnerships = () => Partnership.bulkCreate(partnershipData);

module.exports = seedPartnerships;
