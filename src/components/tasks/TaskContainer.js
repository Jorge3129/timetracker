import Main from "../Main"
import Task from "./Task"
import dayjs from "dayjs";
import './Tasks.css';
import {useEffect, useState} from "react";
import {controller, createTask, addTaskSpan} from "./task-functions";

const TaskContainer = () => {
    const [tasks, setTasks] = useState([]); // completed tasks
    const [lastTask, setLastTask] = useState(null); // the running task
    const [timer, setTimer] = useState(null); // timer instance from setInterval()
    const [showMenu, setShowMenu] = useState(false);
    const [focusId, setFocusId] = useState(0);
    const [taskId, setTaskId] = useState(0);

    useEffect(() => {
        (async ()=> {
            const savedTasks = await controller.getTasks();
            const last = savedTasks[savedTasks.length - 1];
            setTasks(savedTasks.slice(0, -1))
            if (savedTasks.length > 0 ){
                setLastTask(last);
                setTaskId(last.id)
            } else {setLastTask(null)};
        })();
    }, []);


    // handles button click
    function handleAddTask() {
        setTaskId(id => id + 1)
        setShowMenu(false);
        const temp = [...tasks];
        if (lastTask) {
            temp.push(lastTask);
            // send data to server
            controller.postTask({...lastTask, span: addTaskSpan(lastTask)});
        }
        const index = tasks.length + (lastTask ? 1 : 0);
        const task = createTask(index, taskId)
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
        console.log(e.target.parentElement.id);
        setFocusId(Number(e.target.parentElement.id));
        setShowMenu(true);
    }

    function handleStop() {
        if (timer) clearInterval(timer);
        setShowMenu(false);
    }

    function handleDelete() {
        if (timer) clearInterval(timer);
        if (focusId === lastTask.id) {
            const last = tasks[tasks.length - 1];
            setTasks(tasks.slice(0, -1))
            tasks.length > 0 ? setLastTask(last) : setLastTask(null);
        } else {
            setTasks(tasks.filter(task => task.id !== focusId));
        }
        setShowMenu(false);
        controller.deleteTask(focusId);
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
                    <ul className="context-menu">
                        <li onClick={handleStop} className="context-menu-option">Stop</li>
                        <li onClick={handleDelete} className="context-menu-option">Delete</li>
                    </ul> : <></>
            }
            <button onClick={handleAddTask} className="task-button">Add task</button>
        </Main>
    );
};

export default TaskContainer;
