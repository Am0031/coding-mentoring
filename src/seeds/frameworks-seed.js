const { Framework } = require("../models");

const frameworkData = [
  {
    framework_name: "HTML",
  },
  {
    framework_name: "CSS",
  },
  {
    framework_name: "Javascript",
  },
  {
    framework_name: "Express",
  },
  {
    framework_name: "Node",
  },
  {
    framework_name: "Inquirer",
  },
  {
    framework_name: "Handlebars",
  },
  {
    framework_name: "Web API",
  },
  {
    framework_name: "3rd party API",
  },
  {
    framework_name: "Server side API",
  },
  {
    framework_name: "React",
  },
  {
    framework_name: "Vue",
  },
  {
    framework_name: "Angular",
  },
  {
    framework_name: "C#",
  },
  {
    framework_name: "C++",
  },
  {
    framework_name: "Git",
  },
  {
    framework_name: "Bash",
  },
  {
    framework_name: "Java",
  },
];

const seedFrameworks = () => Framework.bulkCreate(frameworkData);

module.exports = seedFrameworks;
