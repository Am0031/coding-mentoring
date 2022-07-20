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
    const password = "password123";
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

const seedMentors = async () => {
  //generating the mentors automatically with the prepareMentorData function
  const mentorData = prepareMentorData();
  //usual seeding function
  const promises = mentorData.map((mentorData) => Mentor.create(mentorData));
  await Promise.all(promises);
};

module.exports = seedMentors;
