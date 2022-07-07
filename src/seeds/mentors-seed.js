const { Mentor } = require("../models");

const mentorData = [
  {
    firstName: "Bob",
    lastName: "Smith",
    userName: "bobsmith",
    email: "bobsmith@example.org",
    password: "password987",
    location: "Birmingham",
    availability: "weekends",
    teachingFormat: "in person",
    personalGoal: "become the best mentor ever",
    profileImageUrl:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    userName: "alicesmith",
    email: "alicesmith@example.org",
    password: "password666",
    location: "London",
    availability: "weekends",
    teachingFormat: "online",
    personalGoal: "develop my skills as a coding teacher",
    profileImageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

const seedMentors = () => Mentor.bulkCreate(mentorData);

module.exports = seedMentors;
