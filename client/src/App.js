import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./components/menu/Menu";
import TaskContainer from "./components/tasks/TaskContainer";
import About from "./components/About";
import Login from "./components/login/Login";
import {useState} from "react";
import Register from "./components/login/Register";

function App() {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userID') || 0);

    return (
        <div className="App">
            <BrowserRouter>
                <Menu setLoggedIn={setLoggedIn}/>
                <Routes>
                    <Route exact path="/" element={<TaskContainer loggedIn={loggedIn}/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
                    <Route path="/register" element={<Register setLoggedIn={setLoggedIn}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
