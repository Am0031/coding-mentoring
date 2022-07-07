const AssignedTasks = require("./AssignedTasks");
const Frameworks = require("./Frameworks");
const Mentee = require("./Mentee");
const MenteeFrameworks = require("./MenteeFrameworks");
const Mentor = require("./Mentor");
const MentorFrameworks = require("./MentorFrameworks");
const Partnership = require("./Partnership");
const Tasks = require("./Tasks");

Mentor.belongsToMany(Mentee, {
  through: Partnership,
  foreignKey: "mentorId",
});

Mentee.belongsToMany(Mentor, {
  through: Partnership,
  foreignKey: "menteeId",
});

Mentor.belongsToMany(Frameworks, {
  through: MentorFrameworks,
  foreignKey: "mentorId",
});

Frameworks.belongsToMany(Mentor, {
  through: MentorFrameworks,
  foreignKey: "frameworkId",
});

Mentee.belongsToMany(Frameworks, {
  through: MenteeFrameworks,
  foreignKey: "menteeId",
});

Frameworks.belongsToMany(Mentee, {
  through: MenteeFrameworks,
  foreignKey: "frameworkId",
});

Frameworks.hasMany(Tasks, {
  foreignKey: "frameworkId",
});

Tasks.belongsTo(Frameworks, {
  foreignKey: "frameworkId",
});

Frameworks.hasMany(AssignedTasks, {
  foreignKey: "frameworkId",
});

AssignedTasks.belongsTo(Frameworks, {
  foreignKey: "frameworkId",
  onDelete: "CASCADE",
});

Mentor.hasMany(AssignedTasks, {
  foreignKey: "mentorId",
});

AssignedTasks.belongsTo(Mentor, {
  foreignKey: "mentorId",
  onDelete: "CASCADE",
});

Mentee.hasMany(AssignedTasks, {
  foreignKey: "menteeId",
});

AssignedTasks.belongsTo(Mentee, {
  foreignKey: "menteeId",
  onDelete: "CASCADE",
});

module.exports = {
  AssignedTasks,
  Frameworks,
  Mentee,
  MenteeFrameworks,
  Mentor,
  MentorFrameworks,
  Partnership,
  Tasks,
};
