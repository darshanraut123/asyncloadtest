const { fail } = require("assert");
const fs = require("fs");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "terum",
});

let dateTime = new Date();
let date = dateTime.toDateString().split(" ");
date = date.join("_");
let time = dateTime.toLocaleTimeString().split(":");
time = time.join("_");
dateTime = date + "_" + time;

console.log(dateTime);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

const totalUnits = 500;
let status = null;
let failedCount = 0;
for (var i = 1; i <= totalUnits; i++) {
  let count = i;

  connection.query(
    "INSERT INTO `terum`.`social_terum` (`created_at`, `updated_at`, `explanation`, `audience`, `goal`, `description`, `user_id`, `status`, `expired_at`, `start_latitude`, `start_longitude`, `target_latitude`, `target_longitude`, `created`, `points`, `shares`, `five_day_notification_sent`, `activist_goal`, `is_goal_reached`, `popularity`, `inviteToFollowers`) VALUES ('2022-07-28 22:48:55.149891', '2022-07-28 22:48:59.324017', 'SF hike to Coit Tower', 'everyone', 'share_knowledge', 'San Francisco’s Coit Tower hike is a beautiful one with stairs through secret gardens of the city!', '102', 'draft', '2022-08-27 22:48:55.149519', '23.3635810000', '23.3635810000', '23.3635810000', '23.3635810000', '0', '0', '1', '0', 'activist_50', '0', '10', '0')",
    function (error, results, fields) {
      if (error) {
        status = { thread: count, status: "fail" };
        failedCount++;
      } else status = { thread: count, status: "pass" };

      //   console.log("The count of thread is: ", results[count].id);
      fs.appendFile(
        "input.txt",
        "TEST: " + dateTime + "  " + JSON.stringify(status) + "\n",
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
      if (count === totalUnits) {
        let passedCount = totalUnits - failedCount;
        const print = {
          Total: totalUnits,
          Pass: passedCount,
          fail: failedCount,
        };

        fs.appendFile(
          "input.txt",
          "TEST: " + dateTime + "  " + JSON.stringify(print) + "\n",
          function (err) {
            if (err) {
              return console.log(err);
            }
          }
        );
      }
    }
  );
}

// setTimeout(() => {
// let passedCount = totalUnits - failedCount;
// const print = {
//   Total: totalUnits,
//   Pass: passedCount,
//   fail: failedCount,
// };

// fs.appendFile(
//   "input.txt",
//   "TEST: " + dateTime + "  " + JSON.stringify(print) + "\n",
//   function (err) {
//     if (err) {
//       return console.log(err);
//     }
//   }
// );
// }, 20000);

connection.end();
