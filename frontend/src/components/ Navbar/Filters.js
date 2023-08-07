import { useNavigate } from "react-router-dom";

function Filters() {
  const navigate = useNavigate();

  const handleFilters = async (e) => {
    e.preventDefault();
    const filter = '(OR (TO "wulfrykpierozek@gmail.com") (FROM "wulfrykpierozek@gmail.com"))';
    navigate(`/${filter}`);
  };


  return (
    <form className={"searchbar-filters"} onSubmit={() => handleFilters()}>
      <li>
        <ul>
          <label for={"from-messages"}>Od</label>
          <div className="inputs-parent">
            <input type={"text"} id={"from-messages"} />
          </div>
        </ul>
        <ul>
          <label htmlFor={"to-messages"}>Do</label>
          <div className="inputs-parent">
            <input type={"text"} id={"to-messages"} />
          </div>
        </ul>
        <ul>
          <label htmlFor={"topic-messages"}>Temat</label>
          <div className="inputs-parent">
            <input type={"text"} id={"topic-messages"} />
          </div>
        </ul>
        <ul>
          <label htmlFor={"contains-messages"}>Zawiera słowa</label>
          <div className="inputs-parent">
            <input type={"text"} id={"contains-messages"} />
          </div>
        </ul>
        <ul>
          <label htmlFor={"exclude-messages"}>Nie zawiera</label>
          <div className="inputs-parent">
            <input type={"text"} id={"exclude-messages"} />
          </div>
        </ul>
        <ul>
          <div className="filters-date-aligment">
            <label htmlFor={"size-messages"}>Rozmiar</label>
            <div className="inputs-parent">
              <input type={"number"} id={"size-messages"} />
              <select>
                <option value="0">Mniej niż</option>
                <option value="1">Więcej niż</option>
                <option value="2">Tyle samo</option>
              </select>
              <select>
                <option value="0">Kb</option>
                <option value="1">Mb</option>
                <option value="2">Gb</option>
              </select>
            </div>
          </div>
        </ul>
      </li>
      <input
      style={{color: "red"}}
        className={"search-bar-submit"}
        type={"submit"}
      />
    </form>
  );
}
export default Filters;
