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
  foreignKey: "mentor_id",
});

Mentee.belongsToMany(Mentor, {
  through: Partnership,
  foreignKey: "mentee_id",
});

Mentor.belongsToMany(Framework, {
  through: MentorFramework,
  foreignKey: "mentor_id",
});

Framework.belongsToMany(Mentor, {
  through: MentorFramework,
  foreignKey: "framework_id",
});

Mentee.belongsToMany(Framework, {
  through: MenteeFramework,
  foreignKey: "mentee_id",
});

Framework.belongsToMany(Mentee, {
  through: MenteeFramework,
  foreignKey: "framework_id",
});

Framework.hasMany(Task, {
  foreignKey: "framework_id",
});

Task.belongsTo(Framework, {
  foreignKey: "framework_id",
});

Task.belongsToMany(Partnership, {
  through: AssignedTask,
  foreignKey: "task_id",
});

Partnership.belongsToMany(Task, {
  through: AssignedTask,
  foreignKey: "partnership_id",
});

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
