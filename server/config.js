const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sgHui780156@#78rTy!%',
    database: 'employee_system'
});

module.exports = {connection};
