import { useState } from "react";
import SideFilters from "./Sidebar/SideFilters";

const Sidebar = ({showSidebar, setShowSidebar}) => {
  const [isShown, setIsShown] = useState(false);
  const display = () => {
      setIsShown((current) => !current)
      setShowSidebar(!showSidebar)
  }
  return (
    <div className="sideside Sidebar">
      <button onClick={ display } className="nav-hamburger" type="button">
        &#9776;
      </button>
      <div className="sidebar-container">{isShown && <SideFilters />}</div>
    </div>
  );
};

export default Sidebar;
