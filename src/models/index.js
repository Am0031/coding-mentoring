const AssignedTask = require("./AssignedTask");
const Framework = require("./Framework");
const Mentee = require("./Mentee");
const MenteeFramework = require("./MenteeFramework");
const Mentor = require("./Mentor");
const MentorFramework = require("./MentorFramework");
const Partnership = require("./Partnership");
const Task = require("./Task");

Mentor.belongsToMany(Mentee, {
  through: Partnership,
  foreignKey: "mentorId",
});

Mentee.belongsToMany(Mentor, {
  through: Partnership,
  foreignKey: "menteeId",
});

Mentor.belongsToMany(Framework, {
  through: MentorFramework,
  foreignKey: "mentorId",
});

Framework.belongsToMany(Mentor, {
  through: MentorFramework,
  foreignKey: "frameworkId",
});

Mentee.belongsToMany(Framework, {
  through: MenteeFramework,
  foreignKey: "menteeId",
});

Framework.belongsToMany(Mentee, {
  through: MenteeFramework,
  foreignKey: "frameworkId",
});

Framework.hasMany(Task, {
  foreignKey: "frameworkId",
});

Task.belongsTo(Framework, {
  foreignKey: "frameworkId",
});

Task.belongsToMany(Partnership, {
  through: AssignedTask,
});

Partnership.belongsToMany(Task, {
  through: AssignedTask,
  onDelete: "CASCADE",
});

// Mentee.hasMany(AssignedTask, {
//   foreignKey: "menteeId",
// });

// AssignedTask.belongsTo(Mentee, {
//   foreignKey: "menteeId",
//   onDelete: "CASCADE",
// });
// Task.hasMany(AssignedTask, {
//   foreignKey: "taskId",
// });
// AssignedTask.belongsTo(Task, {
//   foreignKey: "taskId",
//   onDelete: "CASCADE",
// });

module.exports = {
  AssignedTask,
  Framework,
  Mentee,
  MenteeFramework,
  Mentor,
  MentorFramework,
  Partnership,
  Task,
};
