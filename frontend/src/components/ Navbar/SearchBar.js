import { useState } from "react";
import Filters from "./Filters";

const SearchBar = () => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <div className="searchbar">
        <button type="submit" className="loupe-button">
          <svg className="loupe" height="25" width="25"></svg>
        </button>
        <input type="search" placeholder="Przeszukaj pocztę" />
        <button onClick={handleClick} type="button" className="sliders-button">
          <svg className="sliders" height="25" width="25"></svg>
        </button>
      </div>
      <div className={"filter-container"}>{isShown && <Filters />}</div>
    </div>
  );
};

export default SearchBar;
