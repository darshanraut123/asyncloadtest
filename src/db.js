const mysql = require("mysql2/promise");

const query = async (sql, args) => {
    await connection.query(sql, args);
}

const getConnection = async () => {
    console.log('host is: ', process.env.DB_HOST, 'user is: ', process.env.DB_USER, 'password is: ', process.env.DB_PASSWORD, 'database is: ', process.env.DB_DATABASE);
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    if(connection.state != 'connected') {
        try {
            console.log('connected to database');
        } catch (err) {
            console.log(err)
        }
    }
    return connection;
}

const db = {
    getConnection: getConnection,
    query: query,
    end: (connection) => connection.end()
};

module.exports = db