import Sidebar from "./Sidebar";
import Watch from "./ Navbar/Watch";
import SearchBar from "./ Navbar/SearchBar";

const Navbar = ({ showSidebar, setShowSidebar }) => {
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
                <a>&nbsp; mail@example.com</a>
                <a>&nbsp; Wyloguj</a>
            </div>
        </nav>
    );
};

export default Navbar;
