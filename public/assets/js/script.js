const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const updateInfoForm = $("update-form");
const logoutBtn = $("#logout-btn");
const resetPasswordForm = $("#reset-password-form");
const mentorSearchForm = $("#mentorSearch");
const menteeSearchForm = $("#menteeSearch");
const mentorCardsContainer = $("#mentor-card-container");
const taskSearchForm = $("#taskSearch");
const myTasksSearch = $("#my-tasks-btn");
const taskCardsContainer = $("#task-card-container");
const taskCreateForm = $("#create-task-form");
const assignTaskBtn = $("#assign-task-btn");
const assignTaskForm = $("#assign-task-form");
const frameworkSelectionContainer = $("#framework-selection-container");

let assignTaskModal;
const partnershipsContainer = $("#partnership-card-container");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="mb-3 text-center text-danger error-text">
    ${message}
  </div>`);
};

const generateSimpleCards = (response, user) => {
  const createCard = (each) => {
    return `<div class="card border-success mb-3">
  <div class="card-header d-flex flex-row justify-content-between">
    <h4 class="card-title">${each.username}</h4>
    <div><a class="btn btn-secondary" href="/search/${user}/${each.id}" target="_blank" name="view-profile-btn" id=${each.id}">View profile</a>
    <a class="btn btn-primary" name="email-btn" href="mailto:${each.email}" target="_blank" id="email-btn">Email</a></div>
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
    <div><button class="btn btn-secondary" name="view-profile-btn" href="/search/mentors/${each.id}" target="_blank" id=${each.id}>View profile</button>
    <button class="btn btn-primary" name="add-partnership-btn" id="add-btn-${each.id}" data-id=${each.id} data-name=${each.username}>Add Mentor</button></div></div>
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

  const userType = $("input[type=radio]:checked").attr("id");

  const firstName = $("#firstName").val().trim();
  const lastName = $("#lastName").val().trim();
  const username = $("#username").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const confirmPassword = $("#confirmPassword").val().trim();
  const location = $("#location").val().trim().toLowerCase();
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
    console.log("fields");
    renderError("login-error", "Please complete all fields.");
  }
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  // TODO check syntax
  const userType = target.attr("data-user-type");
  console.log(userType);

  const firstName = $("#firstName").val().trim();
  const lastName = $("#lastName").val().trim();
  // const username = $("#username").val().trim();
  // const email = $("#email").val().trim();
  const password = $("#password").val().trim();
  const confirmPassword = $("#confirmPassword").val().trim();
  const location = $("#location").val().trim().toLowerCase();
  const availability = $("#availability").val().trim();
  const collaborationFormat = $("#collaborationFormat").val().trim();
  const personalGoal = $("#personalGoal").val().trim();
  const profileImageUrl = $("#profileImageUrl").val().trim();
  const gitHubUrl = $("#gitHubUrl").val().trim();

  if (
    firstName &&
    lastName &&
    // username &&
    // email &&
    // password &&
    // confirmPassword &&
    location &&
    availability &&
    collaborationFormat
  ) {
    if (password === confirmPassword) {
      try {
        let payload;

        if (password) {
          payload = {
            firstName,
            lastName,
            // username,
            // email,
            password,
            location,
            availability,
            collaborationFormat,
            personalGoal,
            profileImageUrl,
            gitHubUrl,
          };
        } else {
          payload = {
            firstName,
            lastName,
            // username,
            // email,
            // password,
            location,
            availability,
            collaborationFormat,
            personalGoal,
            profileImageUrl,
            gitHubUrl,
          };
        }

        console.log(payload);

        const response = await fetch(`/api/${userType}s/`, {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/dashboard");
        } else {
          renderError("edit-error", "Failed to update account. Try again.");
        }
      } catch (error) {
        renderError("edit-error", "Failed to update account. Try again.");
      }
    } else {
      renderError("edit-error", "Passwords do not match. Try again.");
    }
  } else {
    renderError("edit-error", "*Please complete all required fields.");
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

  const location = $("#inputLocation").val().trim().toLowerCase();
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
    const rawData = await response.json();
    const userType = rawData.userType;
    const data = rawData.mentees;

    const menteeCards = generateSimpleCards(data, "mentees");
    $("#mentee-browse-container").empty();
    $("#mentee-browse-container").append(menteeCards);
  }
};

const handleMentorSearch = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const location = $("#inputLocation").val().trim().toLowerCase();
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
    const rawData = await response.json();

    const userType = rawData.userType;
    const data = rawData.mentors;

    if (userType === "mentee") {
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
    } else {
      const mentorCards = generateSimpleCards(data, "mentors");
      $("#mentor-browse-container").empty();
      $("#mentor-browse-container").append(mentorCards);
    }
  }
};
const handelResetPasswordSubmit = async (e) => {
  e.preventDefault();

  const email = $("#email").val().trim();

  if (email) {
    try {
      const payload = {
        email,
      };

      const response = await fetch("/auth/reset-password", {
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
        renderError("login-error", "Email address does not exist.");
      }
    } catch (error) {
      renderError("login-error", "Failed to reset password.");
    }
  } else {
    renderError("login-error", "Please complete all fields.");
  }
};
signupForm.submit(handleSignUpSubmit);
loginForm.submit(handleLoginSubmit);
logoutBtn.click(handleLogout);
resetPasswordForm.submit(handelResetPasswordSubmit);
$("#mentorSearch").submit(handleMentorSearch);
$("#menteeSearch").submit(handleMenteeSearch);

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
  if (target.attr("name") === "view-profile-btn") {
    const id = target.attr("id");
    window.open(`http://localhost:4000/search/mentors/${id}`);
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
    $("#task-card-container").append(`<h2>My search results: </h2>`);
    $("#task-card-container").append(taskCards);
  }
};

const handleTaskAssign = async (e, req, res) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  const taskId = target.attr("data-id");

  if (target.attr("name") === "assign-task-btn") {
    localStorage.setItem("currentTask", JSON.stringify(taskId));

    assignTaskModal = new bootstrap.Modal(
      document.getElementById("assign-task-modal")
    );

    $("#assign-task-error").empty();

    assignTaskModal.show();
  }
};

const handleAssignTaskToPartnership = async (e) => {
  try {
    e.preventDefault();

    const menteeId = $("#mentee-select").val();
    console.log(menteeId);

    const taskId = JSON.parse(localStorage.getItem("currentTask")) || {};

    const payload = {
      taskId,
      menteeId,
    };

    const response = await fetch(`/api/assign`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      assignTaskModal.hide();
    } else {
      renderError("assign-task-error", "Task already assigned to this mentee.");
    }
  } catch {
    renderError(
      "assign-task-error",
      "Failed to assign task to mentee. Please try again."
    );
  }
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
      // $("create-task-section").off("click");
      $("#create-task-section").append(
        `<div class="modal" tabindex="-1" id="assign-task-modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Assign to Mentee</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="assign-task-form">
                  <div class="mb-3">
                    <select class="form-select" id="mentee-select">
                      {{#each mentees as |mentee|}}
                        <option value={{id}}>{{username}}</option>
                      {{/each}}
                    </select>
                  </div>
                  <div class="mb-3">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                  <div id="assign-task-error"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
        <h2 class="text-center">Your task was created successfully.</h2>
        <div id="newTaskContainer">
        <h4 id="task-name">Task Name: ${newTask.taskName}</h4>
        <h4>Task Description: ${newTask.taskDescription}</h4>
        <h4>Task Level: ${newTask.taskLevel}</h4>
        <h4>Task Points: ${newTask.points}</h4>
        <h4>Framework Name: ${frameworkName}</h4>
        </div>
        </div>
        <div class="text-center">
        <div><button type="assign" class="btn btn-primary mt-3" name="assign-task-btn" data-id="${newTask.id}" id="assign-task-btn">Assign Task to Mentee</button></div>
        <div><a class="btn btn-primary mt-3" id="create-another-btn" href="/tasks">Create Another Task</a></div>
        <div><a class="btn btn-primary mt-3" id="return-db-btn" href="/dashboard">Return to Dashboard</a></div>
        </div>`
      );
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("error");
  }
};

const handleMyTasksSearch = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  if (target.attr("id") === "my-tasks-btn") {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };
    const response = await fetch("/api/tasks/mentor", options);

    if (response.status !== 200) {
      console.error("Search for tasks failed");
    } else {
      $("#task-card-container").empty();
      const data = await response.json();
      const taskCards = generateTaskCards(data);
      $("#task-card-container").append(`<h2>My tasks</h2>`);
      $("#task-card-container").append(taskCards);
    }
  }
};

const handleChangeTaskStatus = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  if (target.is("button") && target.attr("name") === "change-status-btn") {
    const id = target.attr("data-id");
    const currentStatus = target.attr("data-status");

    if (currentStatus === "true") {
      const newStatus = false;
      const body = { newStatus };

      const options = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };
      const response = await fetch(`/api/assign/update/${id}`, options);

      if (response.status !== 200) {
        console.error("Task status update failed");
      } else {
        $(`#status-btn-${id}`).attr("data-status", newStatus);
        $(`#span-task-${id}`).removeClass("true-status");
        $(`#span-task-${id}`).addClass("false-status");
        $(`#span-task-${id}`).text("In Progress");
      }
    } else {
      const newStatus = true;
      const body = { newStatus };

      const options = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };
      const response = await fetch(`/api/assign/update/${id}`, options);

      if (response.status !== 200) {
        console.error("Task status update failed");
      } else {
        $(`#status-btn-${id}`).attr("data-status", newStatus);
        $(`#span-task-${id}`).removeClass("false-status");
        $(`#span-task-${id}`).addClass("true-status");
        $(`#span-task-${id}`).text("Completed");
      }
    }
  }

  console.log("status changed");
};

const handleFrameworkSelection = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const target = $(e.target);

  if (target.attr("name") === "framework-delete-btn") {
    const addedId = target.attr("data-added-id");
    const id = target.attr("data-framework");

    if (addedId !== 0) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };
      const response = await fetch(`/api/frameworks/user/${addedId}`, options);

      if (response.status !== 200) {
        console.error("Framework removal failed");
      } else {
        $(`#my-framework-${id}`).remove();
        $(`#framework-delete-btn-${id}`).attr("data-added-id", 0);
        $(`#framework-selection-name-${id}`).removeClass("added-status");
      }
    }
  }
  if (target.attr("name") === "framework-selection-btn") {
    const frameworkId = target.attr("data-framework");

    const addedId = target.attr("data-added-id");
    const level = $(`#framework-level-selection-${frameworkId}`)
      .find(":selected")
      .val();
    const payload = { id: addedId, frameworkId, level };
    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };
    const response = await fetch(`/api/frameworks/user`, options);

    if (response.status !== 200) {
      console.error("Framework addition failed");
    } else {
      const frameworkUpdate = await response.json();
      const newId = frameworkUpdate.id;
      if (addedId === 0) {
        $(`#my-frameworks-container`)
          .append(`<div class="framework-icon ml-3 mr-3" id="my-framework-${frameworkUpdate.frameworkId}">
        ${frameworkUpdate.frameworkName}
      </div>`);
      }
      $(`#framework-selection-btn-${frameworkId}`).attr("data-added-id", newId);
      $(`#framework-selection-name-${frameworkId}`).addClass("added-status");
    }
  }
};

signupForm.submit(handleSignUpSubmit);
loginForm.submit(handleLoginSubmit);
updateInfoForm.submit(handleEditSubmit);
logoutBtn.click(handleLogout);
mentorSearchForm.submit(handleMentorSearch);
menteeSearchForm.submit(handleMenteeSearch);
mentorCardsContainer.click(handleMentorSelection);
myTasksSearch.click(handleMyTasksSearch);
taskSearchForm.submit(handleTaskSearch);
taskCardsContainer.click(handleTaskAssign);
assignTaskForm.submit(handleAssignTaskToPartnership);
taskCreateForm.submit(handleTaskCreate);
assignTaskBtn.click(handleTaskAssign);
partnershipsContainer.click(handleChangeTaskStatus);
frameworkSelectionContainer.click(handleFrameworkSelection);
