const {connection} = require('../config');
const dayjs = require("dayjs");

function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

class TaskController {
    async getTasks(req, res) {
        const {userID, date} = req.params;
        await connection.query(
            `SELECT * FROM tasks WHERE userID = ? AND date(start) = ?`,
            [userID, date],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
                res.json(result)
            })

    }

    async insertTask(req, res) {
        const {id, title, desc, start, end, span, color} = req.body;
        const {userID, date} = req.params;
        await connection.query(
            `INSERT INTO tasks(taskId, title, descr, start, end, span, color, userID)
                VALUES (?,?,?,?,?,?,?,?)`,
            [id, title, desc, formatDate(start), formatDate(end), span, color, userID],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success POST', success: true})
    }

    async deleteTask(req, res) {
        const {userID, date, id} = req.params;
        await connection.query(
            `DELETE FROM tasks WHERE taskId = ? AND userID = ? AND date(start) = ?`,
            [id, userID, date],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success DELETE ' + id, success: true})
    }

    async deleteAll(req, res) {
        const {userID, date} = req.params;
        await connection.query(
            `DELETE FROM tasks WHERE userID = ? AND date(start) = ?`,
            [userID, date],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success DELETE ALL', success: true})
    }

    async deleteAllDays(req, res) {
        const {userID} = req.params;
        await connection.query(
            `DELETE FROM tasks WHERE userID = ?`, [userID],
            (err, result) => {
                if (err) return console.log(err);
                console.log(result);
            })
        res.json({message: 'success DELETE ALL', success: true})
    }
}

module.exports = new TaskController()
