const seedMentors = require("./mentors-seed");
const seedMentees = require("./mentees-seed");
const seedFrameworks = require("./frameworks-seed");
const seedTasks = require("./tasks-seed");
const seedMentorFrameworks = require("./mentor-frameworks-seed");
const seedMenteeFrameworks = require("./mentee-frameworks-seed");
const seedPartnerships = require("./partnerships-seed");
const seedAssignedTasks = require("./assigned-tasks-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ alter: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  //await seedMentors();
  // console.log("\n----- MENTORS SEEDED -----\n");

  //await seedMentees();
  // console.log("\n----- MENTEES SEEDED -----\n");

  //await seedFrameworks();
  // console.log("\n----- FRAMEWORKS SEEDED -----\n");

  // await seedMentorFrameworks();
  // console.log("\n----- MENTOR FRAMEWORKS SEEDED -----\n");

  // await seedMenteeFrameworks();
  // console.log("\n----- MENTEE FRAMEWORKS SEEDED -----\n");

  // await seedTasks();
  // console.log("\n----- TASKS SEEDED -----\n");

  // await seedPartnerships();
  // console.log("\n----- PARTNERSHIPS SEEDED -----\n");

  await seedAssignedTasks();
  console.log("\n----- ASSIGNED TASKS SEEDED -----\n");

  process.exit(0);
};

seedAll();
