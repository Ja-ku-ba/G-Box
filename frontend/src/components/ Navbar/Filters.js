function Filters() {
  return (
    <form className={"searchbar-filters"}>
      <li>
        <ul>
          <label for={"from-messages"}>Od</label>
          <input type={"text"} id={"from-messages"} />
        </ul>
        <ul>
          <label htmlFor={"to-messages"}>Do</label>
          <input type={"text"} id={"to-messages"} />
        </ul>
        <ul>
          <label htmlFor={"topic-messages"}>Temat</label>
          <input type={"text"} id={"topic-messages"} />
        </ul>
        <ul>
          <label htmlFor={"contains-messages"}>Zawiera słowa</label>
          <input type={"text"} id={"contains-messages"} />
        </ul>
        <ul>
          <label htmlFor={"exclude-messages"}>Nie zawiera</label>
          <input type={"text"} id={"exclude-messages"} />
        </ul>
        <ul>
          <label htmlFor={"size-messages"}>Rozmiar</label>
          <input type={"text"} id={"size-messages"} />
          <div className="custom-select">
            <select>
              <option value="0">Kb</option>
              <option value="1">Mb</option>
              <option value="2">Gb</option>
            </select>
          </div>
        </ul>
        <ul>
          <label htmlFor={"date-messages"}>Zakres dat</label>
          <div>
            <label htmlFor="birthday">Od:</label>
            <input type="date" id="birthday" name="birthday" />
          </div>
          <div>
            <label htmlFor="birthday">Do:</label>
            <input type="date" id="birthday" name="birthday" />
          </div>
          <input type={"text"} id={"date-messages"} />
        </ul>
      </li>
      <input type={"submit"} placeholder="Szukaj" />
    </form>
  );
}
export default Filters;
