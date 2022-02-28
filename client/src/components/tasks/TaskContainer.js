import Main from "../Main"
import Task from "./Task"
import dayjs from "dayjs";
import './Tasks.css';
import {useEffect, useState} from "react";
import {createTask, addTaskSpan} from "./task-functions";
import controller from './taskController'
import {useBeforeunload} from "react-beforeunload";

let focus = 0;
let maxId = 0;

const TaskContainer = () => {
    const [tasks, setTasks] = useState([]); // completed tasks
    const [lastTask, setLastTask] = useState(null); // the running task
    const [timer, setTimer] = useState(null); // timer instance from setInterval()
    const [showMenu, setShowMenu] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
        (async () => {
            const savedTasks = await controller.getTasks();
            const last = savedTasks[savedTasks.length - 1];
            setTasks(savedTasks.slice(0, -1))
            if (savedTasks.length > 0) {
                setLastTask(last);
                maxId = last.id;
            } else {
                setLastTask(null)
            }
        })();
    }, []);

    useBeforeunload((event) => {
        if (timer) {
            clearInterval(timer);
            controller.postTask({...lastTask, span: addTaskSpan(lastTask)});
            event.preventDefault();
        }
    })

    // handles button click
    function handleAddTask() {
        maxId++;
        console.log('max: '+maxId)
        setShowMenu(false);
        const temp = [...tasks];
        if (lastTask) {
            temp.push(lastTask);
            // send data to server
            // if there is no timer it means we have already saved last task
            if (timer) {
                controller.postTask({...lastTask, span: addTaskSpan(lastTask)});
            }
        }
        const task = createTask(maxId);
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
        setAnchorPoint({ x: e.pageX, y: e.pageY });
        focus = (Number(e.target.closest('.task-row').id));
        console.log(focus)
        setShowMenu(true);
    }

    function handleStop() {
        if (timer) clearInterval(timer);
        setShowMenu(false);
    }

    function handleDelete() {
        if (timer) clearInterval(timer);
        if (focus === lastTask.id) {
            const last = tasks[tasks.length - 1];
            setTasks(tasks.slice(0, -1))
            tasks.length > 0 ? setLastTask(last) : setLastTask(null);
        } else {
            setTasks(tasks.filter(task => task.id !== focus));
        }
        setShowMenu(false);
        controller.deleteTask(focus);
    }

    function handleDeleteAll() {
        if (timer) clearInterval(timer);
        setTasks([])
        setLastTask(null);
        setShowMenu(false);
        controller.deleteAll();
        maxId = 0;
    }

    return (
        <Main title="Tasks">
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
            <button onClick={handleAddTask} className="task-button">Add task</button>
        </Main>
    );
};

export default TaskContainer;
