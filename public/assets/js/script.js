//frontend js

const generateCards = (response) => {
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

  const allChecked = document.querySelectorAll("input[type=checkbox]:checked");
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
    const mentorCards = generateCards(data);
    $("#mentor-card-container").append(mentorCards);
  }
};

$("#signup-btn").click(handleSignupClick);
$("#login-btn").click(handleLoginClick);
$("#mentorSearch").submit(handleMentorSearch);
