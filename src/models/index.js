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

Mentor.hasMany(Task, {
  foreignKey: "authorId",
});

Task.belongsTo(Mentor, {
  foreignKey: "authorId",
});

Task.belongsToMany(Partnership, {
  through: AssignedTask,
  foreignKey: "taskId",
});

Partnership.belongsToMany(Task, {
  through: AssignedTask,
  foreignKey: "partnershipId",
});

Mentor.hasMany(Partnership, {
  foreignKey: "mentorId",
});

Partnership.belongsTo(Mentor, {
  foreignKey: "mentorId",
});

Mentee.hasMany(Partnership, {
  foreignKey: "menteeId",
});

Partnership.belongsTo(Mentee, {
  foreignKey: "menteeId",
});

MentorFramework.belongsTo(Framework, { foreignKey: "frameworkId" });

MenteeFramework.belongsTo(Framework, { foreignKey: "frameworkId" });

Framework.hasMany(MentorFramework, { foreignKey: "frameworkId" });
Framework.hasMany(MenteeFramework, { foreignKey: "frameworkId" });

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
