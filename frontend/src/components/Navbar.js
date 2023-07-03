import Sidebar from "./Sidebar";
import Watch from "./ Navbar/Watch";
import SearchBar from "./ Navbar/SearchBar";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Navbar = ({ showSidebar, setShowSidebar }) => {
    let {name} = useContext(AuthContext)
    return (
        <nav className="nav-container">
            <div className="navbar-groups">
                {/*<button type={"button"} onClick={ () => setShowSidebar(!showSidebar) }>*/}
                    <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                {/*</button>*/}
                <Watch />
            </div>
            <div className="navbar-groups searchbar-component">
                <SearchBar />
            </div>

            <div className={`navbar-groups nav-links ${showSidebar ? "small" : ""}`}>
                <a>&nbsp; mail@example.com, {name}</a>
                <a>&nbsp; Wyloguj</a>
                <Link to={"/login"}>Zaloguj</Link>
            </div>
        </nav>
    );
};

export default Navbar;
