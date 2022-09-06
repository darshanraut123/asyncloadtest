require("dotenv").config();
const { createTerum } = require("./src/terum");
const { createUser } = require("./src/user");

const main = async () => {
  await createTerum(process.env.NUMBER_OF_POSTS);
  await createUser(process.env.NUMBER_OF_USERS);
  console.log("All done!");
  process.exit();
};

main();
