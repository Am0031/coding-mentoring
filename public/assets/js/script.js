//frontend js
const generateMenteeCards = (response) => {
  const createCard = (each) => {
    return `<div class="card border-success mb-3">
  <div class="card-header d-flex flex-row justify-content-between">
    <h4 class="card-title">${each.username}</h4>
  </div>
  <div class="card-body">
    <p class="postText">${each.learningFormat}</p>
    <p class="postText">${each.location}</p>
    <p class="postText">${each.availability}</p>
  </div>
</div>`;
  };
  const responseHtml = response.map(createCard).join("");
  return responseHtml;
};

const generateMentorCards = (response) => {
  const createCard = (each) => {
    return `<div class="card border-success mb-3">
  <div class="card-header d-flex flex-row justify-content-between">
    <h4 class="card-title">${each.username}</h4>
  </div>
  <div class="card-body">
    <p class="postText">${each.teachingFormat}</p>
    <p class="postText">${each.location}</p>
    <p class="postText">${each.availability}</p>
  </div>
</div>`;
  };
  const responseHtml = response.map(createCard).join("");
  return responseHtml;
};

const handleSignupClick = () => {
  console.log("handling signup");
};

const handleLoginClick = () => {
  console.log("handling login");
};

const handleMenteeSearch = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const location = $("#inputLocation").val();
  const teachingFormatSelect = $("#formatSelect").find(":selected").text();

  let learningFormat;

  learningFormatSelect === "All"
    ? (learningFormat = "")
    : (learningFormat = learningFormatSelect);

  const allChecked = $("input[type=checkbox]:checked");
  const checkboxes = Array.from(allChecked).map((checkbox) =>
    parseInt(checkbox.id)
  );

  //passing checkboxes array, teaching format string and city string into our body object
  const searchBody = {
    framework: checkboxes,
    learningFormat,
    location,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(searchBody),
  };
  const response = await fetch("/api/mentees", options);

  if (response.status !== 200) {
    console.error("Search for mentees failed");
  } else {
    const data = await response.json();
    const menteeCards = generateMenteeCards(data);
    $("#mentee-card-container").append(menteeCards);
  }
};

const handleMentorSearch = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const location = $("#inputLocation").val();
  const teachingFormatSelect = $("#formatSelect").find(":selected").text();

  let teachingFormat;

  teachingFormatSelect === "All"
    ? (teachingFormat = "")
    : (teachingFormat = teachingFormatSelect);

  const allChecked = $("input[type=checkbox]:checked");
  const checkboxes = Array.from(allChecked).map((checkbox) =>
    parseInt(checkbox.id)
  );

  //passing checkboxes array, teaching format string and city string into our body object
  const searchBody = {
    framework: checkboxes,
    teachingFormat,
    location,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(searchBody),
  };
  const response = await fetch("/api/mentors", options);

  if (response.status !== 200) {
    console.error("Search for mentors failed");
  } else {
    const data = await response.json();
    const mentorCards = generateMentorCards(data);
    $("#mentor-card-container").append(mentorCards);
  }
};

$("#signup-btn").click(handleSignupClick);
$("#login-btn").click(handleLoginClick);
$("#mentorSearch").submit(handleMentorSearch);
$("#menteeSearch").submit(handleMenteeSearch);
