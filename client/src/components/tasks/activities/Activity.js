const Activity = ({task}) => {
    const {title, desc, start, end, color, id} = task;
    return (<li>
        <button className="task-body" style={{backgroundColor: color}}>
            <h3 className="task-title">{title}</h3>
        </button>
    </li>);
}

export default Activity;
