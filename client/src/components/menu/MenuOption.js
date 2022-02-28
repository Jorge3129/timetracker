import { Link } from "react-router-dom";

const MenuOption = ({ title, path }) => {
  return (
    <li key={`${path}-key`} className = "menu-item">
      <Link to={path} className = "menu-link">
        {title}
      </Link>
    </li>
  );
};

export default MenuOption;
