// const Country = require("country-state-city").Country;
const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="mb-3 text-center text-danger error-text">
    ${message}
  </div>`);
};

const generateMenteeCards = (response) => {
  const createCard = (each) => {
    return `<div class="card border-success mb-3">
  <div class="card-header d-flex flex-row justify-content-between">
    <h4 class="card-title">${each.username}</h4>
  </div>
  <div class="card-body">
    <p class="postText">${each.collaborationFormat}</p>
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
    <p class="postText">${each.collaborationFormat}</p>
    <p class="postText">${each.location}</p>
    <p class="postText">${each.availability}</p>
  </div>
</div>`;
  };
  const responseHtml = response.map(createCard).join("");
  return responseHtml;
};

const handleSignUpSubmit = async (e) => {
  e.preventDefault();

  const userTypeSelected = $("input[type=radio]:checked").attr("id");
  const userType = userTypeSelected;

  const firstName = $("#firstName").val().trim();
  const lastName = $("#lastName").val().trim();
  const username = $("#lastName").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const confirmPassword = $("#confirmPassword").val().trim();
  const location = $("#location").val().trim();
  const availability = $("#availability").val().trim();

  // const availabilitySelected = $("input[type=checkbox]:checked");
  // const availabilityAll = Array.from(availabilitySelected).map(
  //   (selected) => selected.id
  // );

  const collaborationFormat = $("#collaborationFormat").val().trim();
  const personalGoal = $("#personalGoal").val().trim();
  const profileImageUrl = $("#profileImageUrl").val().trim();
  const gitHubUrl = $("#gitHubUrl").val().trim();

  if (
    firstName &&
    lastName &&
    username &&
    email &&
    password &&
    confirmPassword &&
    location &&
    availability &&
    collaborationFormat
  ) {
    if (password === confirmPassword) {
      try {
        const payload = {
          userType,
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword,
          location,
          availability,
          collaborationFormat,
          personalGoal,
          profileImageUrl,
          gitHubUrl,
        };

        console.log(payload);

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/login");
        } else {
          renderError("signup-error", "Failed to create account. Try again.");
        }
      } catch (error) {
        renderError("signup-error", "Failed to create account. Try again.");
      }
    } else {
      renderError("signup-error", "Passwords do not match. Try again.");
    }
  } else {
    renderError("signup-error", "*Please complete all required fields.");
  }
};

const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const userType = $("input[type=radio]:checked").attr("id");

  const email = $("#email").val().trim();
  const password = $("#password").val();

  if (email && password) {
    try {
      const payload = {
        userType,
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError("login-error", "Failed to login. Try again.");
      }
    } catch (error) {
      renderError("login-error", "Failed to login. Try again.");
    }
  } else {
    renderError("login-error", "Please complete all fields.");
  }
};

const handleLogout = async () => {
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.assign("/");
    }
  } catch (error) {
    console.log("Failed to logout");
  }
};

const handleMenteeSearch = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const location = $("#inputLocation").val();
  const collaborationFormatSelect = $("#formatSelect").find(":selected").text();

  let collaborationFormat;

  collaborationFormatSelect === "All"
    ? (collaborationFormat = "")
    : (collaborationFormat = collaborationFormatSelect);

  const allChecked = $("input[type=checkbox]:checked");
  const checkboxes = Array.from(allChecked).map((checkbox) =>
    parseInt(checkbox.id)
  );

  //passing checkboxes array, collaboration format string and city string into our body object
  const searchBody = {
    framework: checkboxes,
    collaborationFormat,
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
  const collaborationFormatSelect = $("#formatSelect").find(":selected").text();

  let collaborationFormat;

  collaborationFormatSelect === "All"
    ? (collaborationFormat = "")
    : (collaborationFormat = collaborationFormatSelect);

  const allChecked = $("input[type=checkbox]:checked");
  const checkboxes = Array.from(allChecked).map((checkbox) =>
    parseInt(checkbox.id)
  );

  //passing checkboxes array, collaboration format string and city string into our body object
  const searchBody = {
    framework: checkboxes,
    collaborationFormat,
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

const cities = () => {
  getCitiesOfCountry(UK);

  console.log(cities);
};

signupForm.submit(handleSignUpSubmit);
loginForm.submit(handleLoginSubmit);
logoutBtn.click(handleLogout);
$("#mentorSearch").submit(handleMentorSearch);
$("#menteeSearch").submit(handleMenteeSearch);
