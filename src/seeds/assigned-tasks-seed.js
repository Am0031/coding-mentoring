const { AssignedTask } = require("../models");

const assignedTaskData = [
  {
    partnershipId: 1,
    taskId: 1,
    taskDeadline: "2022-08-27",
    taskComplete: false,
  },
  {
    partnershipId: 1,
    taskId: 2,
    taskDeadline: "2022-08-27",
    taskComplete: false,
  },
  {
    partnershipId: 3,
    taskId: 3,
    taskDeadline: "2022-08-27",
    taskComplete: false,
  },
  {
    partnershipId: 3,
    taskId: 4,
    taskDeadline: "2022-08-27",
    taskComplete: false,
  },
  {
    partnershipId: 2,
    taskId: 5,
    taskDeadline: "2022-08-27",
    taskComplete: false,
  },
];

const seedAssignedTasks = () => AssignedTask.bulkCreate(assignedTaskData);

module.exports = seedAssignedTasks;
