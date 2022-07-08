const { AssignedTask } = require("../models");

const assignedTaskData = [
  {
    mentorId: 1,
    menteeId: 1,
    frameworkId: 1,
    taskId: 1,
  },
  {
    mentorId: 1,
    menteeId: 1,
    frameworkId: 2,
    taskId: 2,
  },
  {
    mentorId: 3,
    menteeId: 1,
    frameworkId: 3,
    taskId: 3,
  },
  {
    mentorId: 3,
    menteeId: 1,
    frameworkId: 3,
    taskId: 4,
  },
  {
    mentorId: 2,
    menteeId: 2,
    frameworkId: 5,
    taskId: 5,
  },
];

const seedAssignedTasks = () => AssignedTask.bulkCreate(assignedTaskData);

module.exports = seedAssignedTasks;
