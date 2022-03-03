const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sgHui780156@#78rTy!%',
    database: 'employee_system'
});

const countTasks =
    `SELECT u.userID, u.username, COUNT(t.taskID)
    FROM users u
    INNER JOIN tasks t
    ON u.userID = t.userID
    GROUP BY t.userID;`

module.exports = {connection};
