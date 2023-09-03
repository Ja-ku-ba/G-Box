import Sidebar from "./Sidebar";
import Watch from "./ Navbar/Watch";
import SearchBar from "./ Navbar/SearchBar";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const Navbar = ({ showSidebar, setShowSidebar }) => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <nav className="nav-container">
            <div className="navbar-groups">
                {/*<button type={"button"} onClick={ () => setShowSidebar(!showSidebar) }>*/}
                    <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                {/*</button>*/}
                <button onClick={() => window.location.reload(true)} className="nav-clock">
                    <Link to={"/ALL"} ><Watch /></Link>
                </button>
            </div>
            <div className="navbar-groups searchbar-component">
                <SearchBar />
            </div>

            <div className={`navbar-groups nav-links ${showSidebar ? "small" : ""}`}>
                { user && <a>&nbsp; {user.email}</a>}
                { user ? (
                    <a onClick={logoutUser}>&nbsp; Wyloguj</a>
                ) : (
                    <Link to={"/login"}>Zaloguj</Link>
                )}


            </div>
        </nav>
    );
};

export default Navbar;
