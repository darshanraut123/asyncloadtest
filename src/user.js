var db = require("./db");
const logger = require("./logger");

const userObject = {
  username: "user",
  first_name: "firstname",
  last_name: "lastname",
  email: "user@gmail.com",
  is_superuser: "0",
  last_login: "2022-07-17 08:55:35.940898",
  date_joined: "2022-07-28 22:48:55.149891",
  status: "ACTIVE",
  password: "pbkdf2_sha256$180000$M7DEz4joF7rZ$pdKh/TjAU35QZOnh/y/XBS3O8X919fjcSEEOC4mSvxk=",
  address: "Somewhere on earth",
  bio: "My bio",
  city: "City",
  country: "Globe",
  gender: "male",
  state: "State",
  zipcode: "411033",
  profile_photo: "undefined",
  is_flagged: "0",
  terrcoin: "10",
  initialized: "0",
  is_push_notification_enabled: "1",
  curr_week_terrcoin: "10",
  prev_week_terrcoin: "0",
};

const insert = async (connection, index) => {

    //As username and email is unique, in our case index every time starts from 0 so appended random number.
    const randomDigits = Math.random().toFixed(2) * 100000 + index;
    let email = "LOAD_" + randomDigits + "_" + userObject.email;
    let username = "LOAD_" + randomDigits + "_" + userObject.username;
    let sqlQuery = `INSERT INTO users_user ( password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, address, bio, city, country, gender, state, zipcode, profile_photo, is_flagged, terrcoin, initialized, is_push_notification_enabled, curr_week_terrcoin, prev_week_terrcoin) VALUES ('${userObject.password}', '${userObject.last_login}', '${userObject.is_superuser}', '${username}', '${userObject.first_name}', '${userObject.last_name}', '${email}', '1', '1','${userObject.date_joined}', '${userObject.address}', '${userObject.bio}', '${userObject.city}',  '${userObject.address}',  '${userObject.gender}',  '${userObject.state}',  '${userObject.zipcode}',  '${userObject.profile_photo}',  '${userObject.is_flagged}',  '${userObject.terrcoin}',  '${userObject.initialized}',  '${userObject.is_push_notification_enabled}', '${userObject.curr_week_terrcoin}', '${userObject.prev_week_terrcoin}')`;
    try {
        console.log("before user insert", index);
        let results = await connection.query(sqlQuery);
        if (results[0]?.insertId) {

            //Link that interest to user
            sqlQuery = `INSERT INTO users_user_interests (user_id, category_id) VALUES (${results[0].insertId}, '3')`;
            await connection.query(sqlQuery);
        } else logger.log("Entry failed for index: "+index);

    logger.log(results);
    console.log("after user insert", index);
  } catch (err) {
    if (err) {
      logger.log(err);
    }
  }
};

const createUser = async (count) => {
  const connection = await db.getConnection();
  for (let index = 0; index < count; index++) {
    await insert(connection, index);
  }
};

module.exports = {
  createUser
};
