import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./components/menu/Menu";
import TaskContainer from "./components/tasks/TaskContainer";
import About from "./components/About";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route exact path="/" element={<TaskContainer/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
