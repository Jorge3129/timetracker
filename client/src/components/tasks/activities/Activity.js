const Activity = ({task}) => {
    const {title, desc, start, end, color, id} = task;

    // handleClick(){
    //
    // }

    return (<li className={"activity-item"} key={title+'key'}>
        <button className="task-body activity-button" style={{backgroundColor: color}}>
            <h3 className="task-title activity-title">{title}</h3>
        </button>
    </li>);
}

export default Activity;
