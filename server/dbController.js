const {connection, query} = require('./dbQueries');
const dayjs = require("dayjs");

function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

class DBController {
    async connectToDB() {
        await connection.connect((err) => {
            if (err) return console.error('error: ' + err.message);
            console.log('Connected to the MySQL server.');
        });
    }

    async createTable() {
        await connection.query(query.createTable, (err) => {
            if (err) return console.log(err.message)
            console.log('Created table.');
        });
    }

    async getTasks(req, res) {
        // ???
        await connection.query(query.getTasks,
            (err, result) => {
                if (err) throw err;
                console.log(result);
                res.json(result)
            })

    }

    async insertTask(req, res) {
        const body = req.body
        const {id, title, desc, start, end, span, color} = body;
        console.log(body);
        await connection.query(query.insertTask, [id, title, desc, formatDate(start), formatDate(end), span, color],
            (err, result) => {
                if (err) throw err;
                console.log(result);
            })
        res.json({message: 'success POST', success: true})
    }

    async deleteTask(req, res) {
        const {id} = req.body;
        console.log(id);
        await connection.query(query.deleteTask, id,
            (err, result) => {
                if (err) throw err;
                console.log(result);
            })
        res.json({message: 'success DELETE ' + id, success: true})
    }
}

module.exports = new DBController()
