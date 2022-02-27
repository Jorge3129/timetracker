import { Link } from "react-router-dom";

const Header = () => {
  return <header className="header">
      <h1 className="header-title"><Link to="/" className="header-title">Time<br/>Tracker</Link></h1>
  </header>;
};

export default Header;
