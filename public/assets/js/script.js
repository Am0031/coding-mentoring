const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const mentorSearchForm = $("#mentorSearch");
const menteeSearchForm = $("#menteeSearch");
const mentorCardsContainer = $("#mentor-card-container");
const taskSearchForm = $("#taskSearch");
const taskCardsContainer = $("#task-card-container");
const taskCreateForm = $("#create-task-form");

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
    <a class="btn btn-primary" href="mailto:${each.email}" target="_blank" id="email-btn">Email Mentee</a>
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

const generateMentorCards = (data, partnerships) => {
  const createCard = (each) => {
    return `<div class="card border-success mb-3">
  <div class="card-header d-flex flex-row justify-content-between">
    <h4 class="card-title">${each.username}</h4>
    <div class="add-partnership-div-${each.id}">
    <button class="btn btn-primary" name="add-partnership-btn" id="add-btn-${each.id}" data-id=${each.id} data-name=${each.username}>Add Mentor</button></div>
  </div>
  <div class="card-body">
    <p class="postText">${each.collaborationFormat}</p>
    <p class="postText">${each.location}</p>
    <p class="postText">${each.availability}</p>
  </div>
</div>`;
  };
  const createDisabledCard = (each) => {
    return `<div class="card border-success mb-3">
  <div class="card-header d-flex flex-row justify-content-between">
    <h4 class="card-title">${each.username}</h4>
    <div>
    <p class="partnership-comment" data-id=${each.id} data-name=${each.username}>You're already working with this mentor!</p></div>
  </div>
  <div class="card-body">
    <p class="postText">${each.collaborationFormat}</p>
    <p class="postText">${each.location}</p>
    <p class="postText">${each.availability}</p>
  </div>
</div>`;
  };

  const partnerMentors = partnerships.map((i) => i.mentorId);
  let responseHtml;
  if (!partnerships) {
    responseHtml = data.map(createCard).join("");
  } else {
    responseHtml = data
      .map((each) => {
        const isPartner = partnerMentors.includes(each.id);
        if (isPartner) {
          return createDisabledCard(each);
        } else {
          return createCard(each);
        }
      })
      .join("");
  }

  return responseHtml;
};

const generateTaskCards = (data) => {
  const createCard = (each) => {
    return `<div class="card mb-3" id="task-container-${each.id}">
  <div class="card-header d-flex flex-row justify-content-between align-items-center">
    <div class="d-flex flex-row align-items-center"><h4 class="card-title mr-2">${each.taskName}</h4>
    <p class="btn btn-dark mr-2 mb-0">${each.frameworkName}</p>
    <p class="btn btn-dark mr-2 mb-0">${each.taskLevel}</p></div>
    <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapse-${each.id}" role="button" aria-expanded="false" aria-controls="collapse-${each.id}" data-id=${each.id}>
    View Details
    </a>
    </div>
  <div class="collapse" id="collapse-${each.id}">
    <div class="card card-body">
        <div class="card-body d-flex flex-column justify-content-center" id="task-details-container-${each.id}">
          <div class="d-flex flex-column">
            <p class="task-detail">Points: ${each.points}</p>
            <p class="task-detail">Description: ${each.taskDescription}</p>
            <p class="task-detail">Useful resources: ${each.resourceURL}</p>
          </div>
          <button class="btn btn-primary" data-id=${each.id} name="assign-task-btn">Assign task to a mentee</button>
        </div>
    </div>
  </div>
  </div>`;
  };
  const responseHtml = data.map(createCard).join("");
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
    $("#mentee-card-container").empty();
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
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };
    const partnerships = await (
      await fetch("/api/partnerships/mentee", options)
    ).json();

    const mentorCards = generateMentorCards(data, partnerships);
    $("#mentor-card-container").empty();
    $("#mentor-card-container").append(mentorCards);
  }
};

const handleMentorSelection = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const target = $(e.target);
  const mentorId = target.attr("data-id");
  const mentorName = target.attr("data-name");
  const projectName = `Coding practice with ${mentorName}`;

  const partnershipBody = { mentorId, projectName };

  if (target.is("button") && target.attr("name") === "add-partnership-btn") {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(partnershipBody),
    };
    const response = await fetch("/api/partnerships", options);

    if (response.status !== 200) {
      console.error("Partnership could not be created");
    } else {
      target.removeClass("btn-primary");
      target.addClass("btn-success");
      target.text("Added");
      target.attr("disabled", "true");
    }
  }
};

const handleTaskSearch = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const levelSelect = $("#levelSelect").find(":selected").text();
  let taskLevel;
  levelSelect === "All" ? (taskLevel = "") : (taskLevel = levelSelect);

  const allChecked = $("input[type=checkbox]:checked");
  const checkboxes = Array.from(allChecked).map((checkbox) =>
    parseInt(checkbox.id)
  );

  //passing checkboxes array, collaboration format string and city string into our body object
  const searchBody = {
    framework: checkboxes,
    taskLevel,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(searchBody),
  };
  const response = await fetch("/api/tasks", options);

  if (response.status !== 200) {
    console.error("Search for tasks failed");
  } else {
    $("#task-card-container").empty();
    const data = await response.json();
    const taskCards = generateTaskCards(data);
    $("#task-card-container").append(taskCards);
  }
};

const handleTaskAssign = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);
  const id = target.attr("data-id");
  //render form for assignment to a mentee
  if (target.attr("name") === "assign-task-btn") {
    $(`#task-details-container-${id}`).append(
      `<div><p>Make a modal to select mentee and assign</p></div>`
    );
  }
  //bring list of current mentees in partnership from DB and render select list
};

const handleTaskCreate = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const taskName = $("#taskName").val().trim();
  const taskDescription = $("#taskDescription").val();
  const frameworkId = $("#framework").find(":selected").val();
  const frameworkName = $("#framework").find(":selected").text();
  const resourceURL = $("#resourceURL").val().trim();
  const taskLevel = $("#taskLevel").find(":selected").val();
  let points;
  if (taskLevel === "beginner") {
    points = 20;
  } else if (taskLevel === "intermediate") {
    points = 40;
  } else {
    points = 60;
  }

  let payload;
  if (resourceURL) {
    payload = {
      taskName,
      taskDescription,
      taskLevel,
      points,
      frameworkId,
      resourceURL,
    };
  } else {
    payload = {
      taskName,
      taskDescription,
      taskLevel,
      points,
      frameworkId,
    };
  }

  try {
    const response = await fetch("/api/tasks/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response) {
      const data = await response.json();
      const newTask = data.newTask;

      $("#create-task-section").empty();
      $("#create-task-section").append(
        `<div><h4>Your task was created successfully. See the details below.</h4><div id="newTaskContainer"><div><h4 id="task-name">Task Name: ${newTask.taskName}</h4><h4>Task Description: ${newTask.taskDescription}</h4><h4>Task Level: ${newTask.taskLevel}</h4><h4>Task Points: ${newTask.points}</h4><h4>Framework Name: ${frameworkName}</h4></div></div><div>Assign to mentee button</div><div> <button type="create" class="btn btn-primary" id="create-another-btn">Create Another Task</button></div><div>Go back to dashboard button(href)</div></div>`
      );
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("error");
  }
};

signupForm.submit(handleSignUpSubmit);
loginForm.submit(handleLoginSubmit);
logoutBtn.click(handleLogout);
mentorSearchForm.submit(handleMentorSearch);
menteeSearchForm.submit(handleMenteeSearch);
mentorCardsContainer.click(handleMentorSelection);
taskSearchForm.submit(handleTaskSearch);
taskCardsContainer.click(handleTaskAssign);
taskCreateForm.submit(handleTaskCreate);
