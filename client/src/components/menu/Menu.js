import Header from "./Header"
import MenuOption from "./MenuOption"
import './Menu.css'
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUser} from "../../redux/userSlice";

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout(){
        localStorage.clear();
        dispatch(setUser(0));
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
