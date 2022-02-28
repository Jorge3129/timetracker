class TaskQuery {
    getTasks = `SELECT * FROM tasks`

    insertTask = `INSERT INTO tasks(taskId, title, descr, start, end, span, color)
    VALUES (?,?,?,?,?,?,?)`

    deleteTask = `DELETE FROM tasks
    WHERE taskId = ?`

    deleteAll = `DELETE FROM tasks`
}

module.exports = new TaskQuery();
