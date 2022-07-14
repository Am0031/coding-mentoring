const { Framework } = require("../models");

const frameworkData = [
  {
    frameworkName: "HTML",
  },
  {
    frameworkName: "CSS",
  },
  {
    frameworkName: "Javascript",
  },
  {
    frameworkName: "Express",
  },
  {
    frameworkName: "Node",
  },
  {
    frameworkName: "Handlebars",
  },
  {
    frameworkName: "API",
  },
  {
    frameworkName: "React",
  },
  {
    frameworkName: "Git",
  },
  {
    frameworkName: "MySQL",
  },
  {
    frameworkName: "NoSQL",
  },
  {
    frameworkName: "jQuery",
  },
];

const seedFrameworks = () => Framework.bulkCreate(frameworkData);

module.exports = seedFrameworks;
