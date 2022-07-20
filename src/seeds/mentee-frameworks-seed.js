const { MenteeFramework, Mentee, Framework } = require("../models");

const prepareMenteeFrameworkData = async () => {
  const frameworksArray = (await Framework.findAll()).map((f) => f.dataValues);

  const menteesArray = (await Mentee.findAll()).map((m) => m.dataValues);

  const levelArray = ["beginner", "intermediate", "advanced"];
  const menteeFrameworkData = [];

  for (let i = 1; i < menteesArray.length + 1; i += 1) {
    const menteeId = i;
    const numberOfFrameworks = Math.floor(Math.random() * 4);
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
        const menteeFramework = { menteeId, frameworkId, level };
        menteeFrameworkData.push(menteeFramework);
      }
    }
  }

  return menteeFrameworkData;
};

const seedMenteeFrameworks = async () => {
  const menteeFrameworkData = await prepareMenteeFrameworkData();
  await MenteeFramework.bulkCreate(menteeFrameworkData);
};

module.exports = seedMenteeFrameworks;
