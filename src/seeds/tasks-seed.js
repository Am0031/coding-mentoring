const { Task, Framework } = require("../models");

const prepareTaskData = async () => {
  const frameworksArray = (await Framework.findAll()).map((f) => f.dataValues);

  const levelArray = ["beginner", "intermediate", "advanced"];
  const taskData = [];

  for (let i = 0; i < frameworksArray.length; i += 1) {
    const framework = frameworksArray[i];
    const frameworkId = framework.id;
    const frameworkName = framework.frameworkName;

    for (let t = 1; t < 21; t += 1) {
      const taskName = `${frameworkName} practice - Activity #${t}`;
      const taskDescription =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

      const taskLevel =
        levelArray[Math.floor(Math.random() * levelArray.length)];
      let points;
      if (taskLevel === "beginner") {
        points = 20;
      } else if (taskLevel === "intermediate") {
        points = 40;
      } else {
        points = 60;
      }

      const task = {
        taskName,
        taskDescription,
        taskLevel,
        frameworkId,
        points,
      };
      taskData.push(task);
    }
  }

  return taskData;
};

// const taskData = [
//   {
//     taskName: "HTML practice",
//     taskDescription:
//       "You must build a sign up page html, adding a welcome message and a form with several fields",
//     taskLevel: "beginner",
//     frameworkId: 1,
//     points: 20,
//   },
//   {
//     taskName: "Flexbox practice",
//     taskDescription:
//       "Your challenge is to build a visual weather dashboard with html and css, using flexbox properties to position all the elements on the page. You must use flex direction, positioning and spacing content, and the wrap property.",
//     taskLevel: "beginner",
//     frameworkId: 2,
//     points: 20,
//     resourceURL: "https://www.w3schools.com/jsref/jsref_map.asp",
//   },
//   {
//     taskName: "Javascript algorithm - Map an array",
//     taskDescription:
//       "Your challenge is to build a function that can map through an array of objects to get a specific key/value pair from each object in an array.",
//     taskLevel: "beginner",
//     frameworkId: 3,
//     points: 20,
//     resourceURL: "https://www.w3schools.com/jsref/jsref_map.asp",
//   },
//   {
//     taskName: "Javascript algorithm - Find in array",
//     taskDescription:
//       "Your challenge is to build a function that can look through an array to find a specific value and return the index of this value in the array",
//     taskLevel: "beginner",
//     frameworkId: 3,
//     points: 20,
//     resourceURL: "https://www.w3schools.com/jsref/jsref_find.asp",
//   },
//   {
//     taskName: "Inquirer package",
//     taskDescription:
//       "Your challenge is to build a function that can uses inquirer to ask questions to the user and returns a summary table of the answers collected.",
//     taskLevel: "beginner",
//     frameworkId: 5,
//     points: 20,
//     resourceURL: "https://www.npmjs.com/package/inquirer",
//   },
// ];

const seedTasks = async () => {
  const taskData = await prepareTaskData();
  await Task.bulkCreate(taskData);
  console.log("Successfully seeded tasks");
};

module.exports = seedTasks;
