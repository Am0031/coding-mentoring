const { Task } = require("../models");

const taskData = [
  {
    taskName: "HTML practice",
    taskDescription:
      "You must build a sign up page html, adding a welcome message and a form with several fields",
    taskLevel: "beginner",
    frameworkId: 1,
  },
  {
    taskName: "Flexbox practice",
    taskDescription:
      "Your challenge is to build a visual weather dashboard with html and css, using flexbox properties to position all the elements on the page. You must use flex direction, positioning and spacing content, and the wrap property.",
    taskLevel: "beginner",
    frameworkId: 2,
  },
  {
    taskName: "Javascript algorithm - Map an array",
    taskDescription:
      "Your challenge is to build a function that can map through an array of objects to get a specific key/value pair from each object in an array.",
    taskLevel: "beginner",
    frameworkId: 3,
    resourceURL: "https://www.w3schools.com/jsref/jsref_map.asp",
  },
  {
    taskName: "Javascript algorithm - Find in array",
    taskDescription:
      "Your challenge is to build a function that can look through an array to find a specific value and return the index of this value in the array",
    taskLevel: "beginner",
    frameworkId: 3,
    resourceURL: "https://www.w3schools.com/jsref/jsref_find.asp",
  },
  {
    taskName: "Inquirer package",
    taskDescription:
      "Your challenge is to build a function that can uses inquirer to ask questions to the user and returns a summary table of the answers collected.",
    taskLevel: "beginner",
    frameworkId: 5,
    resourceURL: "https://www.npmjs.com/package/inquirer",
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
