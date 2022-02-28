const query = require('./taskQueries');
const {connection} = require('../config');
const dayjs = require("dayjs");

function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

class TaskController {
    async getTasks(req, res) {
        // ???
        await connection.query(query.getTasks,
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
                res.json(result)
            })

    }

    async insertTask(req, res) {
        const body = req.body
        const {id, title, desc, start, end, span, color} = body;
        await connection.query(query.insertTask, [id, title, desc, formatDate(start), formatDate(end), span, color],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success POST', success: true})
    }

    async deleteTask(req, res) {
        const {id} = req.params;
        await connection.query(query.deleteTask, id,
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success DELETE ' + id, success: true})
    }

    async deleteAll(req, res) {
        await connection.query(query.deleteAll,[],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success DELETE ALL', success: true})
    }
}

module.exports = new TaskController()
