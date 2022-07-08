const { Task } = require("../models");

const taskData = [
  {
    task_name: "HTML practice",
    task_description:
      "You must build a sign up page html, adding a welcome message and a form with several fields",
    task_level: "beginner",
    framework_id: 1,
    points: 20,
  },
  {
    task_name: "Flexbox practice",
    task_description:
      "Your challenge is to build a visual weather dashboard with html and css, using flexbox properties to position all the elements on the page. You must use flex direction, positioning and spacing content, and the wrap property.",
    task_level: "beginner",
    framework_id: 2,
    points: 20,
    resourceURL: "https://www.w3schools.com/jsref/jsref_map.asp",
  },
  {
    task_name: "Javascript algorithm - Map an array",
    task_description:
      "Your challenge is to build a function that can map through an array of objects to get a specific key/value pair from each object in an array.",
    task_level: "beginner",
    framework_id: 3,
    points: 20,
    resourceURL: "https://www.w3schools.com/jsref/jsref_map.asp",
  },
  {
    task_name: "Javascript algorithm - Find in array",
    task_description:
      "Your challenge is to build a function that can look through an array to find a specific value and return the index of this value in the array",
    task_level: "beginner",
    framework_id: 3,
    points: 20,
    resourceURL: "https://www.w3schools.com/jsref/jsref_find.asp",
  },
  {
    task_name: "Inquirer package",
    task_description:
      "Your challenge is to build a function that can uses inquirer to ask questions to the user and returns a summary table of the answers collected.",
    task_level: "beginner",
    framework_id: 5,
    points: 20,
    resourceURL: "https://www.npmjs.com/package/inquirer",
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;
