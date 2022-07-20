const { Task, Framework, MentorFramework, Mentor } = require("../models");
const { faker } = require("@faker-js/faker");

const prepareTaskData = async () => {
  const frameworksArray = (await Framework.findAll()).map((f) => f.dataValues);

  const levelArray = ["beginner", "intermediate", "advanced"];
  const taskData = [];

  for (let i = 0; i < frameworksArray.length; i += 1) {
    const framework = frameworksArray[i];
    const frameworkId = framework.id;
    const frameworkName = framework.frameworkName;

    const matchingMentorsArray = (
      await MentorFramework.findAll({ where: { frameworkId: frameworkId } })
    ).map((m) => m.dataValues);

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

    for (let n = 0; n < matchingMentorsArray.length; n += 1) {
      const extractMentor = matchingMentorsArray[n];
      const authorId = extractMentor.mentorId;
      const mentorLevel = extractMentor.level;

      let taskLevel;
      if (mentorLevel === "guide") {
        taskLevel = "beginner";
      } else if (mentorLevel === "master") {
        taskLevel = "intermediate";
      } else {
        taskLevel = "advanced";
      }
      let points;
      if (taskLevel === "beginner") {
        points = 20;
      } else if (taskLevel === "intermediate") {
        points = 40;
      } else {
        points = 60;
      }
      for (let t = 1; t < 6; t += 1) {
        const taskName = `${frameworkName} exercise #${t} - ${taskLevel}`;
        const taskDescription = faker.lorem.paragraph();

        const task = {
          taskName,
          taskDescription,
          taskLevel,
          frameworkId,
          points,
          authorId,
        };
        taskData.push(task);
      }
    }
  }

  return taskData;
};

const seedTasks = async () => {
  const taskData = await prepareTaskData();
  await Task.bulkCreate(taskData);
};

module.exports = seedTasks;
