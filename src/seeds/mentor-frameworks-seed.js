const { MentorFramework, Framework, Mentor } = require("../models");

const prepareMentorFrameworkData = async () => {
  const frameworksArray = (await Framework.findAll()).map((f) => f.dataValues);

  const mentorsArray = (await Mentor.findAll()).map((m) => m.dataValues);

  const levelArray = ["guide", "master", "guru"];
  const mentorFrameworkData = [];

  for (let i = 1; i < mentorsArray.length + 1; i += 1) {
    const mentorId = i;
    const numberOfFrameworks = Math.floor(Math.random() * 5);
    let f = numberOfFrameworks;
    let chosenFrameworksId = [];

    while (f > 0) {
      const frameworkId =
        frameworksArray[Math.floor(Math.random() * frameworksArray.length)].id;
      const level = levelArray[Math.floor(Math.random() * levelArray.length)];

      const alreadyChosen = chosenFrameworksId.includes(frameworkId);

      if (!alreadyChosen) {
        chosenFrameworksId.push(frameworkId);
        f -= 1;
        const mentorFramework = { mentorId, frameworkId, level };
        mentorFrameworkData.push(mentorFramework);
      }
    }
  }

  return mentorFrameworkData;
};

// const mentorFrameworkData = [
//   {
//     mentorId: 1,
//     frameworkId: 2,
//     level: "guide",
//   },
//   {
//     mentorId: 2,
//     frameworkId: 4,
//     level: "master",
//   },
//   {
//     mentorId: 2,
//     frameworkId: 5,
//     level: "master",
//   },
//   {
//     mentorId: 1,
//     frameworkId: 3,
//     level: "guru",
//   },
//   {
//     mentorId: 3,
//     frameworkId: 1,
//     level: "guru",
//   },
//   {
//     mentorId: 3,
//     frameworkId: 2,
//     level: "guru",
//   },
//   {
//     mentorId: 3,
//     frameworkId: 3,
//     level: "guru",
//   },
// ];

const seedMentorFrameworks = async () => {
  const mentorFrameworkData = await prepareMentorFrameworkData();
  await MentorFramework.bulkCreate(mentorFrameworkData);
  console.log("Successfully seeded mentors frameworks");
};

module.exports = seedMentorFrameworks;
