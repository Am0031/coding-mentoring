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
    frameworkName: "Inquirer",
  },
  {
    frameworkName: "Handlebars",
  },
  {
    frameworkName: "Web API",
  },
  {
    frameworkName: "3rd party API",
  },
  {
    frameworkName: "Server side API",
  },
  {
    frameworkName: "React",
  },
  {
    frameworkName: "Vue",
  },
  {
    frameworkName: "Angular",
  },
  {
    frameworkName: "C#",
  },
  {
    frameworkName: "C++",
  },
  {
    frameworkName: "Git",
  },
  {
    frameworkName: "Bash",
  },
  {
    frameworkName: "Java",
  },
];

const seedFrameworks = () => Framework.bulkCreate(frameworkData);

module.exports = seedFrameworks;
