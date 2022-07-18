const {
  AssignedTask,
  Partnership,
  Mentee,
  Mentor,
  Framework,
  Task,
} = require("../models");

const prepareAssignedTasksData = async () => {
  const assignedTaskData = [];
  const partnershipsRaw = await Partnership.findAll({
    attributes: ["id", "mentorId", "menteeId"],
    include: [
      {
        model: Mentee,
        attributes: ["id", "username"],
        as: "mentee",
        include: [
          {
            model: Framework,
            through: { attributes: ["level"], as: "level" },
            attributes: ["id"],
            as: "frameworks",
          },
        ],
      },
      {
        model: Mentor,
        attributes: ["id", "username"],
        as: "mentor",
        include: [
          {
            model: Framework,
            through: { attributes: ["level"], as: "level" },
            attributes: ["id"],
            as: "frameworks",
          },
        ],
      },
    ],
  });
  const partnerships = partnershipsRaw.map((i) => i.get({ plain: true }));

  const tasks = (await Task.findAll()).map((i) => i.get({ plain: true }));

  for (let i = 0; i < partnerships.length; i += 1) {
    const partnership = partnerships[i];
    const partnershipId = partnership.id;
    const mentorsChosenFrameworks = partnership.mentor.frameworks.map(
      (i) => i.id
    );
    const menteesChosenFrameworks = partnership.mentee.frameworks.map(
      (i) => i.id
    );
    const commonFrameworks = mentorsChosenFrameworks.filter((i) =>
      menteesChosenFrameworks.includes(i)
    );

    for (let n = 0; n < commonFrameworks.length; n += 1) {
      const frameworkId = commonFrameworks[n];
      const menteeFrameworkDetails = partnership.mentee.frameworks;
      const thisFramework = menteeFrameworkDetails.filter(
        (i) => i.id === frameworkId
      );
      const thisFrameworkLevel = Object.values(thisFramework[0]);
      const menteeLevel = Object.values(thisFrameworkLevel[1]).toString();
      const numberOfTasks = Math.floor(Math.random() * 3);
      const relevantTasks = tasks
        .filter((i) => i.taskLevel === menteeLevel)
        .filter((i) => i.frameworkId === frameworkId);

      for (let t = 0; t < numberOfTasks; t += 1) {
        const taskId =
          relevantTasks[Math.floor(Math.random() * relevantTasks.length)].id;
        const taskDeadline = "2022-08-31";
        const assignedTask = { taskId, partnershipId, taskDeadline };

        assignedTaskData.push(assignedTask);
      }
    }
  }

  return assignedTaskData;
};

// const assignedTaskData = [
//   {
//     partnershipId: 1,
//     taskId: 1,
//     taskDeadline: "2022-08-27",
//     taskComplete: false,
//   },
//   {
//     partnershipId: 1,
//     taskId: 2,
//     taskDeadline: "2022-08-27",
//     taskComplete: false,
//   },
//   {
//     partnershipId: 3,
//     taskId: 3,
//     taskDeadline: "2022-08-27",
//     taskComplete: false,
//   },
//   {
//     partnershipId: 3,
//     taskId: 4,
//     taskDeadline: "2022-08-27",
//     taskComplete: false,
//   },
//   {
//     partnershipId: 2,
//     taskId: 5,
//     taskDeadline: "2022-08-27",
//     taskComplete: false,
//   },
// ];

const seedAssignedTasks = async () => {
  const assignedTaskData = await prepareAssignedTasksData();
  await AssignedTask.bulkCreate(assignedTaskData);
  console.log("Successfully seeded assigned tasks");
};

module.exports = seedAssignedTasks;
