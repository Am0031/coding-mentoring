const seedMentors = require("./mentors-seed");
const seedMentees = require("./mentees-seed");
const seedFrameworks = require("./frameworks-seed");
const seedTasks = require("./tasks-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedMentors();
  console.log("\n----- MENTORS SEEDED -----\n");

  await seedMentees();
  console.log("\n----- MENTEES SEEDED -----\n");

  await seedFrameworks();
  console.log("\n----- FRAMEWORKS SEEDED -----\n");

  await seedTasks();
  console.log("\n----- TASKS SEEDED -----\n");

  process.exit(0);
};

seedAll();
