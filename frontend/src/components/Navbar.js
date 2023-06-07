import Watch from "./ Navbar/Watch";
import Sidebar from "./Sidebar";
import SearchBar from "./ Navbar/SearchBar";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-groups">
        <Sidebar />
        <Watch />
      </div>

      <div className="navbar-groups searchbar-component">
        <SearchBar />
      </div>

      <div className="navbar-groups nav-links">
        <a>&nbsp; mail@example.com</a>
        <a>&nbsp; Wyloguj</a>
      </div>
    </nav>
  );
};

export default Navbar;
