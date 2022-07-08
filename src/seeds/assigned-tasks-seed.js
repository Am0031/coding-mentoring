const { AssignedTask } = require("../models");

const assignedTaskData = [
  {
    partnership_id: 1,
    task_id: 1,
    task_deadline: "2022-08-27",
    task_complete: false,
  },
  {
    partnership_id: 1,
    task_id: 2,
    task_deadline: "2022-08-27",
    task_complete: false,
  },
  {
    partnership_id: 3,
    task_id: 3,
    task_deadline: "2022-08-27",
    task_complete: false,
  },
  {
    partnership_id: 3,
    task_id: 4,
    task_deadline: "2022-08-27",
    task_complete: false,
  },
  {
    partnership_id: 2,
    task_id: 5,
    task_deadline: "2022-08-27",
    task_complete: false,
  },
];

const seedAssignedTasks = () => AssignedTask.bulkCreate(assignedTaskData);

module.exports = seedAssignedTasks;
