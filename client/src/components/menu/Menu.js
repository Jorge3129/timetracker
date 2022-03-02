import Header from "./Header"
import MenuOption from "./MenuOption"
import './Menu.css'
import {click} from "@testing-library/user-event/dist/click";
import {useNavigate} from "react-router";

const Menu = ({setLoggedIn}) => {
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.clear();
        setLoggedIn(0);
        navigate('/');
    }

    return(
        <nav className="menu-main">
            <Header />
            <ul className="menu-list">
                <MenuOption title="Tasks" path="/"/>
                <MenuOption title="About" path="/about"/>
                <MenuOption title="Register" path="/register"/>
                <MenuOption title="Login" path="/login"/>
                <li key={"logout"} className = "menu-item">
                    <button onClick={handleLogout} className="menu-link logout">Logout</button>
                </li>

            </ul>
        </nav>
    )
}

export default Menu
