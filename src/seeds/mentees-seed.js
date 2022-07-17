const { Mentee } = require("../models");
const { faker } = require("@faker-js/faker");

//function to generate mentors programmatically, using the faker package and assigning the remaining fields randomly
const prepareMenteeData = () => {
  const gitHubUrlExample = "https://github.com/Am0031";
  const availabilityArray = ["weekdays", "weekend"];
  const collaborationFormatArray = ["online", "in person", "hybrid"];

  const menteeData = [];

  for (let i = 0; i < 100; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.userName();
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password();
    const location = faker.address.city().trim().toLowerCase();
    const availability =
      availabilityArray[Math.floor(Math.random() * availabilityArray.length)];
    const collaborationFormat =
      collaborationFormatArray[
        Math.floor(Math.random() * collaborationFormatArray.length)
      ];
    const personalGoal = faker.lorem.sentence();
    const profileImageUrl = faker.image.cats();
    const gitHubUrl = gitHubUrlExample;
    const xp = Math.floor(Math.random() * 10) * 100;

    const mentee = {
      firstName,
      lastName,
      username,
      email,
      password,
      location,
      availability,
      collaborationFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl,
      xp,
    };
    menteeData.push(mentee);
  }

  return menteeData;
};

//static set of seeds for mentees - starter set
// const menteeData = [
//   {
//     firstName: "Cherelle",
//     lastName: "Simpson",
//     username: "C-Sim",
//     email: "cherellesimpson@example.org",
//     password: "password123",
//     location: "Birmingham",
//     availability: "weekends",
//     collaborationFormat: "online",
//     personalGoal: "become a full stack developer",
//     profileImageUrl:
//       "https://images.unsplash.com/photo-1515191107209-c28698631303?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//     gitHubUrl: "https://github.com/Am0031",
//     xp: 0,
//   },
//   {
//     firstName: "Ricky",
//     lastName: "Green",
//     username: "rickygreen",
//     email: "rickygreen@example.org",
//     password: "password345",
//     location: "Kettering",
//     availability: "weekdays",
//     collaborationFormat: "online",
//     personalGoal: "develop my javascript skills and find a job",
//     profileImageUrl:
//       "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
//     gitHubUrl: "https://github.com/Am0031",
//     xp: 0,
//   },
//   {
//     firstName: "Abdi",
//     lastName: "Osman",
//     username: "osman",
//     email: "aosman@example.org",
//     password: "password456",
//     location: "Reading",
//     availability: "weekdays",
//     collaborationFormat: "in person",
//     personalGoal: "learn more about coding in general",
//     profileImageUrl:
//       "https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//     gitHubUrl: "https://github.com/Am0031",
//     xp: 0,
//   },
// ];

const seedMentees = async () => {
  //generating the mentors automatically with the prepareMentorData function
  const menteeData = prepareMenteeData();
  //usual seeding function
  const promises = menteeData.map((menteeData) => Mentee.create(menteeData));
  await Promise.all(promises);
  console.log("Successfully seeded mentees");
};

module.exports = seedMentees;
