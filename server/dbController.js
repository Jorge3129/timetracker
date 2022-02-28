const {connection} = require('./config');

class DbController {
    async connectToDB() {
        await connection.connect((err) => {
            if (err) return console.log(err);
            console.log('Connected to the MySQL server.');
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
    color CHAR(7))`;

    async createTable() {
        await connection.query(this.createTableQuery, (err) => {
            if (err) return console.log(err);
            console.log('Created table.');
        });
    }
}

module.exports = new DbController()
