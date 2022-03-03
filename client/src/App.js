import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./components/menu/Menu";
import About from "./components/About";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import withMain from "./components/hocs/withMain"
import TaskList from "./components/tasks/TaskList";

const TasksWithMain = withMain(TaskList, 'Tasks', true);
const AboutWithMain = withMain(About, 'About', false);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route exact path="/" element={<TasksWithMain/>}/>
                    <Route path="/about" element={<AboutWithMain/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
