const Task = ({task}) => {
    const {title, desc, start, end, color, id} = task;
    return (
        <tr className="task-row" id={id}>
            <td className="task-time">
                {start.format('HH:mm:ss')} - {end.format('HH:mm:ss')}
            </td>
            <td className="task-body" style={{backgroundColor: color}}>
                <h3 className="task-title">{title}</h3>
                <p className="task-desc">{desc}</p>
            </td>
            <td className="task-time">
                {end.subtract(start.hour(), 'hour').format('H')} h {''}
                {end.subtract(start.minute(), 'minute').format('m')} m {''}
                {end.subtract(start.second(), 'second').format('s')} s
            </td>
        </tr>
    );
};

export default Task;
