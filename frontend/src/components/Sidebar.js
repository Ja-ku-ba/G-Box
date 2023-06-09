import { useState } from "react";
import SideFilters from "./Sidebar/SideFilters";

const Navbar = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown((current) => !current);
  };
  return (
    <div className="sideside">
      <button onClick={handleClick} type="button">
        &#9776;
      </button>
      <div className="sidebar-container">{isShown && <SideFilters />}</div>
    </div>
  );
};

export default Navbar;
