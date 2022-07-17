const {
  Partnership,
  Mentee,
  Mentor,
  MenteeFramework,
  MentorFramework,
} = require("../models");
const { faker } = require("@faker-js/faker");

const preparePartnershipData = async () => {
  const menteeFrameworksArray = (await MenteeFramework.findAll()).map(
    (m) => m.dataValues
  );
  const mentorFrameworksArray = (await MentorFramework.findAll()).map(
    (m) => m.dataValues
  );

  const extractMentees = menteeFrameworksArray.map((m) => m.menteeId);

  const targetMentees = [...new Set(extractMentees)];

  let partnershipData = [];

  for (let i = 0; i < targetMentees.length; i += 1) {
    const menteeId = targetMentees[i];
    //find the frameworks for that mentee
    const relevantFrameworks = menteeFrameworksArray
      .filter((i) => i.menteeId === menteeId)
      .map((i) => i.frameworkId);

    //filter for the relevant mentors
    const matchingMentors = mentorFrameworksArray
      .filter((i) => relevantFrameworks.includes(i.frameworkId))
      .map((i) => i.mentorId);

    //allocate the right number of mentors
    const numberOfMentors = Math.floor(Math.random() * 3);
    let f = numberOfMentors;
    let chosenMentorsId = [];

    while (f > 0) {
      const mentorId =
        matchingMentors[Math.floor(Math.random() * matchingMentors.length)];

      const alreadyChosen = chosenMentorsId.includes(mentorId);

      //push in partnership data array
      if (!alreadyChosen) {
        chosenMentorsId.push(mentorId);
        f -= 1;
        const projectName = faker.lorem.words();
        const partnership = { mentorId, menteeId, projectName };
        partnershipData.push(partnership);
      }
    }
  }

  return partnershipData;
};

// const partnershipData = [
//   {
//     mentorId: 1,
//     menteeId: 1,
//     projectName: "front-end practice",
//   },
//   {
//     mentorId: 2,
//     menteeId: 2,
//     projectName: "CLI with node",
//   },
//   {
//     mentorId: 3,
//     menteeId: 1,
//     projectName: "javascript practice",
//   },
// ];

const seedPartnerships = async () => {
  const partnershipData = await preparePartnershipData();
  await Partnership.bulkCreate(partnershipData);
  console.log("Successfully seeded partnerships");
};

module.exports = seedPartnerships;
