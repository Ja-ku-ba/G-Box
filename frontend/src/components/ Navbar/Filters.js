import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useState } from "react";


function Filters() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({});

  const onChange = (e) => {
    const { id, value } = e.target;
    setQuery((prevQuery) => ({ ...prevQuery, [id]: value }));
  };
  console.log(query)

  // if user write something into url, and then set filters, error will ocure
  const handleFilters = (e) => {
    e.preventDefault();
    setSearchParams(query);
    navigate(`/ALL/${window.location.search}`)
    window.location.reload()
  };


  return (
    <form className={"searchbar-filters"} onSubmit={e => handleFilters(e)}>
      <li>
        <ul>
          <label htmlFor={"from"}>Od</label>
          <div className="inputs-parent">
            <input type={"text"} id={"from"} onChange={(e) => onChange(e)}/>
          </div>
        </ul>
        <ul>
          <label htmlFor={"to"}>Do</label>
          <div className="inputs-parent">
            <input type={"text"} id={"to"} onChange={(e) => onChange(e)}/>
          </div>
        </ul>
        <ul>
          <label htmlFor={"subject"}>Temat</label>
          <div className="inputs-parent">
            <input type={"text"} id={"subject"} onChange={(e) => onChange(e)}/>
          </div>
        </ul>
        <ul>
          <label htmlFor={"contains"}>Zawiera słowa</label>
          <div className="inputs-parent">
            <input type={"text"} id={"contains"} onChange={(e) => onChange(e)}/>
          </div>
        </ul>
        <ul>
          <label htmlFor={"exclude"}>Nie zawiera</label>
          <div className="inputs-parent">
            <input type={"text"} id={"exclude"} onChange={(e) => onChange(e)}/>
          </div>
        </ul>
        <ul>
          <div className="filters-date-aligment">
            <label htmlFor={"size"}>Rozmiar</label>
            <div className="inputs-parent">
              <input type={"number"} id={"size"} onChange={(e) => onChange(e)}/>
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
        className={"search-bar-submit"}
        type={"submit"}
      />
    </form>
  );
}
export default Filters;