require('dotenv').config()
const { createTerum } = require("./src/terum")

const main = async () => {
  await createTerum(process.env.NUMBER_OF_POSTS);
  console.log('All done!');
  process.exit()
}

main();