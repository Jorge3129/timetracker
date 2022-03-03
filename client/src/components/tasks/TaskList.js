import Task from "./Task"
import './Tasks.css';
import dayjs from "dayjs";
import {useEffect, useRef, useState} from "react";
import {createTask, addTaskSpan} from "../../utils/task-functions";
import taskAPI from '../../utils/taskAPI'
import {useBeforeunload} from "react-beforeunload";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/userSlice";
import ActivityList from "./activities/ActivityList";

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // completed routes
    const [lastTask, setLastTask] = useState(null); // the running task
    const [timer, setTimer] = useState(null); // timer instance from setInterval()
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(true);
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y: 0});
    const [date, setDate] = useState(dayjs());

    const user = useSelector(selectUser);

    const ref = useRef({
        focus: 0,
        maxId: 0,
        day: 1
    });

    useEffect(() => {
        (async () => {
            if (!user) return;
            await initTasks(dayjs());
        })();
    }, []);

    async function initTasks(day) {
        const savedTasks = await taskAPI.getTasks(user, day);
        const last = savedTasks[savedTasks.length - 1];
        setTasks(savedTasks.slice(0, -1))
        if (savedTasks.length > 0) {
            setLastTask(last);
            ref.current.maxId = last.id;
        } else {
            setLastTask(null)
        }
        setLoading(false);
    }

    useBeforeunload((event) => {
        if (timer) {
            clearInterval(timer);
            alert('hey:/')
            taskAPI.postTask({...lastTask, span: addTaskSpan(lastTask)}, user);
            event.preventDefault();
        }
    })

    function setupDays() {
        return new Array(7)
            .fill(0)
            .map((e, i) => i + 1)
            .map(day => dayjs().day(day === 0 ? 7 : day));
    }

    // handles button click
    function handleAddTask() {
        ref.current.maxId++;
        console.log('max: ' + ref.current.maxId)
        setShowMenu(false);
        const temp = [...tasks];
        if (lastTask) {
            temp.push(lastTask);
            if (timer) {
                taskAPI.postTask({
                    ...lastTask,
                    span: addTaskSpan(lastTask),
                }, user);
            }
        }
        const task = createTask(ref.current.maxId);
        setLastTask(task);
        setTasks(temp);
        startTimer(task);
    }

    function startTimer(obj) {
        if (timer) clearInterval(timer);
        setTimer(setInterval(() => {
            const tempTask = {...obj};
            tempTask.end = dayjs();
            setLastTask(tempTask);
        }, 1000));
    }

    function handleMenu(e) {
        e.preventDefault();
        setAnchorPoint({x: e.pageX, y: e.pageY});
        ref.current.focus = (Number(e.target.closest('.task-row').id));
        console.log(ref.current.focus)
        setShowMenu(true);
    }

    function handleStop() {
        if (timer) clearInterval(timer);
        setShowMenu(false);
    }

    function handleDelete() {
        if (timer) clearInterval(timer);
        if (ref.current.focus === lastTask.id) {
            const last = tasks[tasks.length - 1];
            setTasks(tasks.slice(0, -1))
            tasks.length > 0 ? setLastTask(last) : setLastTask(null);
        } else {
            setTasks(tasks.filter(task => task.id !== ref.current.focus));
        }
        setShowMenu(false);
        taskAPI.deleteTask(ref.current.focus, user, date);
    }

    function handleDeleteAll() {
        if (timer) clearInterval(timer);
        setTasks([])
        setLastTask(null);
        setShowMenu(false);
        taskAPI.deleteAll(user, date);
        ref.current.maxId = 0;
    }

    async function setDay(e, day) {
        await initTasks(day);
        e.target.style['color'] = '#ff0000'
        setDate(day);
    }

    function getWeekDay(date) {
        return date.day() === 0 ? 7 : date.day();
    }

    if (loading) return <h2>Loading...</h2>;

    return (
        <>
            <main className={"task-main"}>
                <h1>XYN</h1>
                <ul className={"day-list"}>
                    {setupDays().map(date =>
                        <li className={"day-li"} key={`day-${date.format()}`}>
                            <button id={'' + getWeekDay(date)} onClick={(e) => setDay(e, date)}
                                    className={"day-button"}>{getWeekDay(date)}</button>
                        </li>)}
                </ul>
                {tasks.length < 1 && !lastTask ? <></> :
                    <table onContextMenu={(e) => handleMenu(e)} className="task-table">
                        <thead className="task-table-head">
                        <tr>
                            <th className="task-heading">Time span</th>
                            <th className="task-heading">Task</th>
                            <th className="task-heading">Time total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tasks.map(task => (
                                <Task key={JSON.stringify(task)} last={false} task={task}/>
                            ))
                        }
                        {lastTask ?
                            <Task key={JSON.stringify(lastTask)} last={true} task={lastTask}/> : <></>}
                        </tbody>
                    </table>
                }
                {
                    showMenu ?
                        <ul
                            className="context-menu"
                            style={{
                                top: anchorPoint.y,
                                left: anchorPoint.x
                            }}
                        >
                            <li onClick={handleStop} className="context-menu-option">Stop</li>
                            <li onClick={handleDelete} className="context-menu-option">Delete</li>
                            <li onClick={handleDeleteAll} className="context-menu-option">Delete All</li>
                        </ul> : <></>
                }
                {date.isSame(dayjs(), 'day') ?
                    <button onClick={handleAddTask} className="task-button">Add task</button> : <></>}
            </main>
            <ActivityList/>
        </>
    );
};

export default TaskList;
