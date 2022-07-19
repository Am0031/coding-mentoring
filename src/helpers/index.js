const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

const formatStatus = (status) => {
  return status ? "completed" : "in progress";
};

const isEqualTo = (data, equalToString) => {
  return data === equalToString;
};

module.exports = {
  isEqualTo,
  formatDate,
  formatStatus,
};
