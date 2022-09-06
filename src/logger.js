const fs = require("fs");

const log = (message) => {
  message = new Date().toLocaleString() + " " + message;
  fs.appendFile("input.txt", JSON.stringify(message) + "\n", function (err) {
    if (err) {
      return console.log(err);
    }
  });
};

module.exports = {
  log: log,
};
