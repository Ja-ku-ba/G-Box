import Sidebar from "./Sidebar";
import Watch from "./ Navbar/Watch";
import SearchBar from "./ Navbar/SearchBar";

const Navbar = ({ setShowSidebar, showSidebar }) => {
  return (
    <nav className="nav-container">
      <div className="navbar-groups">
        <Sidebar onClick={() => setShowSidebar(true)} />
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
