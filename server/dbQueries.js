const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sgHui780156@#78rTy!%',
    database: 'employee_system'
});

class Query {
    createTable = `CREATE TABLE IF NOT EXISTS
    tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    taskId INT,
    title VARCHAR(200) NOT NULL,
    descr VARCHAR(200),
    start DATETIME,
    end DATETIME,
    span VARCHAR(50),
    color CHAR(7))`;

    getTasks = `SELECT * FROM tasks`

    insertTask = `INSERT INTO tasks(taskId, title, descr, start, end, span, color)
    VALUES (?,?,?,?,?,?,?)`

    deleteTask = `DELETE FROM tasks
    WHERE taskId = ?`
}

module.exports = {connection, query: new Query()}
