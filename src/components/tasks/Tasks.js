import PageHeader from "./PageHeader"
import Task from "./Task"

const Tasks = () => {
    const array = new Array(3);
    for (let index = 0; index < array.length; index++) {
        array[index] = {
            title: `Task ${index + 1}`,
            desc: 'Blblabla Blblabla Blblabla Blblabla Blblabla Blblabla Blblabla Blblabla',
            id: `id${index}`,
            start: new Date(),
            end: new Date()
        };
    }

    return (
        <PageHeader title="Tasks">
            <table className="task-table">
                <thead className="task-table-head">
                <tr>
                    <th className="task-heading">Time</th>
                    <th className="task-heading">Task</th>
                </tr>
                </thead>
                {
                    array.map(task => (
                        <Task task={task}/>
                    ))
                }
            </table>
        </PageHeader>
    );
};

export default Tasks;
