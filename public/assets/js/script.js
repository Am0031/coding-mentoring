//frontend js

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

const handleSignupClick = async (e) => {
  e.preventDefault();
  console.log("handling signup");

  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const username = $("#lastName").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  const location = $("#location").val();
  const availability = $("#availability").val();
  const teachingFormat = $("#teachingFormat").val();
  const learningFormat = $("#learningFormat").val();
  const personalGoal = $("#personalGoal").val();
  const profileImageUrl = $("#profileImageUrl").val();
  const gitHubUrl = $("#gitHubUrl").val();

  //  TODO - pass in mentor/mentee selection from radio button
  const userType = "mentor";

  if (userType === "mentor") {
    if (
      (firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      location,
      availability,
      teachingFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl)
    ) {
      if (password === confirmPassword) {
        const payload = {
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword,
          location,
          availability,
          teachingFormat,
          personalGoal,
          profileImageUrl,
          gitHubUrl,
        };

        return payload;
      } else {
        renderError("signup-error", "Passwords do not match. Try again.");
      }
    } else {
      renderError("signup-error", "Please complete all required fields.");
    }
  }

  if (userType === "mentor") {
    if (
      (firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      location,
      availability,
      learningFormat,
      personalGoal,
      profileImageUrl,
      gitHubUrl)
    ) {
      if (password === confirmPassword) {
        const payload = {
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword,
          location,
          availability,
          learningFormat,
          personalGoal,
          profileImageUrl,
          gitHubUrl,
        };

        return payload;
      } else {
        renderError("signup-error", "Passwords do not match. Try again.");
      }
    } else {
      renderError("signup-error", "Please complete all required fields.");
    }
  }

  try {
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
};

const handleLoginClick = async (e) => {
  console.log("handling login");

  e.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  if (email && password) {
    try {
      const payload = {
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
    renderError("login-error", "Please complete all required fields.");
  }
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
