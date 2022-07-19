const { Mentor } = require("../models");
const { faker } = require("@faker-js/faker");

//function to generate mentors programmatically, using the faker package and assigning the remaining fields randomly
const prepareMentorData = () => {
  const gitHubUrlExample = "https://github.com/Am0031";
  const availabilityArray = ["weekdays", "weekend", "both"];
  const collaborationFormatArray = ["online", "in-person", "hybrid"];

  const mentorData = [];

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

    const mentor = {
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
    mentorData.push(mentor);
  }

  return mentorData;
};

//static set of seeds - starter set
// const mentorData = [
//   {
//     firstName: "Bob",
//     lastName: "Smith",
//     username: "bobsmith",
//     email: "bobsmith@example.org",
//     password: "password987",
//     location: "Birmingham",
//     availability: "weekends",
//     collaborationFormat: "in-person",
//     personalGoal: "become the best mentor ever",
//     profileImageUrl:
//       "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     gitHubUrl: "https://github.com/Am0031",
//     xp: 0,
//   },
//   {
//     firstName: "Alice",
//     lastName: "Smith",
//     username: "alicesmith",
//     email: "alicesmith@example.org",
//     password: "password666",
//     location: "London",
//     availability: "weekends",
//     collaborationFormat: "online",
//     personalGoal: "develop my skills as a coding teacher",
//     profileImageUrl:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     gitHubUrl: "https://github.com/Am0031",
//     xp: 0,
//   },
//   {
//     firstName: "Mary",
//     lastName: "Black",
//     username: "maryberry",
//     email: "maryblack@example.org",
//     password: "password601",
//     location: "York",
//     availability: "weekdays",
//     collaborationFormat: "online",
//     personalGoal: "develop my skills as a coding teacher",
//     profileImageUrl:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     gitHubUrl: "https://github.com/Am0031",
//     xp: 0,
//   },
// ];

const seedMentors = async () => {
  //generating the mentors automatically with the prepareMentorData function
  const mentorData = prepareMentorData();
  //usual seeding function
  const promises = mentorData.map((mentorData) => Mentor.create(mentorData));
  await Promise.all(promises);
  console.log("Successfully seeded mentors");
};

module.exports = seedMentors;
