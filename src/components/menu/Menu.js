import Header from "./Header"
import MenuOption from "./MenuOption"
const Menu = () => {
    return(
        <nav className="menu-main">
            <Header />
            <ul className="menu-list">
                <MenuOption title="Tasks" path="/"/>
                <MenuOption title="About" path="/about"/>
            </ul>
        </nav>
    )
}

export default Menu
