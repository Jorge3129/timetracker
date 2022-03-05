import dayjs from "dayjs";

export function createTask(id) {
    return {
        id: id,
        title: `Task ${id}`,
        desc: 'Blblabla',
        start: dayjs(),
        end: dayjs(),
        color: ['#ff512e', '#ffd52e', '#afff2e', '#bdfffe'][(id - 1) % 4],
        running: true
    }
}

export function addTaskSpan(task) {
    const {start, end} = task;
    return `${end.subtract(start.hour(), 'hour').format('HH')}-` +
        `${end.subtract(start.minute(), 'minute').format('mm')}-` +
        `${end.subtract(start.second(), 'second').format('ss')}`;
}
