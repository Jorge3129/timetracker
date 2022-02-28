import dayjs from "dayjs";

class TaskController {
    async getRawTasks() {
        try {
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const content = await response.json();
            //console.log(content);
            return content;
        } catch (e) {
            console.log(e)
            return e;
        }
    }

    async getTasks() {
        const tasks = await this.getRawTasks();
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

    async postTask(task) {
        try {
            alert('POST: ' + task.id)
            const response = await fetch('http://localhost:8000/tasks', {
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

    async deleteTask(id) {
        try {
            const url = 'http://localhost:8000/tasks/' + id;
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

    async deleteAll() {
        try {
            const response = await fetch('http://localhost:8000/tasks', {
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

export default new TaskController();
