const { Mentee } = require("../models");

const menteeData = [
  {
    firstName: "Cherelle",
    lastName: "Simpson",
    username: "C-Sim",
    email: "cherellesimpson@example.org",
    password: "password123",
    location: "Birmingham",
    availability: "weekends",
    collaborationFormat: "online",
    personalGoal: "become a full stack developer",
    profileImageUrl:
      "https://images.unsplash.com/photo-1515191107209-c28698631303?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    gitHubUrl: "https://github.com/Am0031",
    xp: 0,
  },
  {
    firstName: "Ricky",
    lastName: "Green",
    username: "rickygreen",
    email: "rickygreen@example.org",
    password: "password345",
    location: "Kettering",
    availability: "weekdays",
    collaborationFormat: "online",
    personalGoal: "develop my javascript skills and find a job",
    profileImageUrl:
      "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    gitHubUrl: "https://github.com/Am0031",
    xp: 0,
  },
  {
    firstName: "Abdi",
    lastName: "Osman",
    username: "osman",
    email: "aosman@example.org",
    password: "password456",
    location: "Reading",
    availability: "weekdays",
    collaborationFormat: "in person",
    personalGoal: "learn more about coding in general",
    profileImageUrl:
      "https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    gitHubUrl: "https://github.com/Am0031",
    xp: 0,
  },
];

const seedMentees = async () => {
  const promises = menteeData.map((menteeData) => Mentee.create(menteeData));
  await Promise.all(promises);
  console.log("Successfully seeded mentees");
};

module.exports = seedMentees;
