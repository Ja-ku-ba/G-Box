import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Filters = () => {
  let navigate = useNavigate();
  let [filter, setFilter] = useState("All")

  let handleOnChange = (e) => {
    setFilter(e.target.value)
    navigate(`/${e.target.value}`)
  }

  return (
    <select value={filter} onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
      <option value="All">Wszystkie</option>
      <option value="ANSWERED">Odpowiedziane</option>
      <option value="DELETED">Usunięte</option>
      <option value="DRAFT">Wersje robocze</option>
      <option value="FLAGGED">Oflagowane</option>
      <option value="NEW">Nowe</option>
      <option value="OLD">Stare</option>
      <option value="RECENT">Ostatnie</option>
      <option value="SEEN">Otworzone</option>
    </select>
  )
}

export default Filters
