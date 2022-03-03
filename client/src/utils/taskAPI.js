import dayjs from "dayjs";

class TaskAPI {
    async getRawTasks(userID, date) {
        try {
            const response = await fetch(`http://localhost:8000/tasks/${userID}/${date.format('YYYY-MM-DD')}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (e) {
            console.log(e)
            return e;
        }
    }

    async getTasks(userID, date) {
        const tasks = await this.getRawTasks(userID, date);
        return tasks.map(task => (
            {
                ...task,
                start: dayjs(task.start),
                end: dayjs(task.end),
                desc: task.descr,
                id: task.taskId
            }
        ));
    }

    async postTask(task, userID, date) {
        try {
            const response = await fetch(`http://localhost:8000/tasks/${userID}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            const content = await response.json();
            //console.log(content);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteTask(id, userID, date) {
        try {
            const url = `http://localhost:8000/tasks/${userID}/${date.format('YYYY-MM-DD')}/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await response.json();
            console.log(content);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAll(userID, date) {
        try {
            const response = await fetch(`http://localhost:8000/tasks/${userID}/${date.format('YYYY-MM-DD')}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await response.json();
            console.log(content);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAllDays(userID) {
        try {
            const response = await fetch('http://localhost:8000/tasks/'+ userID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const content = await response.json();
            console.log(content);
        } catch (e) {
            console.log(e)
        }
    }
}

export default new TaskAPI();
