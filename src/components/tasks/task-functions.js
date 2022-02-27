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
            console.log(content);
            return content;
        } catch (e) {
            console.log(e)
            return e;
        }
    }

    async getTasks(){
        const tasks = await this.getRawTasks();
        return tasks.map(task => (
            {...task,
                start: dayjs(task.start),
                end: dayjs(task.end),
                desc: task.descr,
                id: task.taskId
            }
        ));
    }

    async postTask(task) {
        try {
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            const content = await response.json();
            console.log(content);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteTask(id) {
        try {
            const response = await fetch('http://localhost:8000/tasks', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });
            const content = await response.json();
            console.log(content);
        } catch (e) {
            console.log(e)
        }
    }
}

export const controller = new TaskController();

export function createTask(index, id) {
    return {
        id: id + 1,
        title: `Task ${index + 1}`,
        desc: 'Blblabla Blblabla Blblabla',
        start: dayjs(),
        end: dayjs(),
        span: dayjs(),
        color: ['#ff512e', '#ffd52e', '#afff2e', '#bdfffe'][index % 4]
    }
}

export function addTaskSpan(task) {
    const {start, end} = task;
    return `${end.subtract(start.hour(), 'hour').format('HH')}-` +
        `${end.subtract(start.minute(), 'minute').format('mm')}-` +
        `${end.subtract(start.second(), 'second').format('ss')}`;
}
