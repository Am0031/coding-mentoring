const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("DD/MM/YY");
};

const formatStatus = (status) => {
  return status ? "Completed" : "In progress";
};

const isEqualTo = (data, equalToString) => {
  return data === equalToString;
};

module.exports = {
  isEqualTo,
  formatDate,
  formatStatus,
};
