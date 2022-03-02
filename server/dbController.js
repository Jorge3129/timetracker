const {connection} = require('./config');

class DbController {
    async connectToDB() {
        await connection.connect((err) => {
            if (err) return console.log(err);
            console.log('Connected to the MySQL server.');
        });
    }

    createUserTableQuery = `CREATE TABLE IF NOT EXISTS
    users(
    userID INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200))`

    async createUserTable() {
        await connection.query(this.createUserTableQuery, (err) => {
            if (err) return console.log(err);
            console.log('Created user table.');
        });
    }


    createTableQuery = `CREATE TABLE IF NOT EXISTS
    tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    taskId INT,
    title VARCHAR(200) NOT NULL,
    descr VARCHAR(200),
    start DATETIME,
    end DATETIME,
    span VARCHAR(50),
    color CHAR(7),
    userID INT,    
    FOREIGN KEY (userID) REFERENCES users(userID))`

    async createTaskTable() {
        await connection.query(this.createTableQuery, (err) => {
            if (err) return console.log(err);
            console.log('Created task table.');
        });
    }

}

module.exports = new DbController()
