import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Filters = () => {
  let navigate = useNavigate();
  let [filter, setFilter] = useState("All")

  let handleOnChange = (e) => {
    setFilter(e.target.value)
    navigate(`/inbox/${e.target.value}`)
    window.location.reload();
  }

  return (
    <select value={filter} onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
      <option value="All">Wszystkie</option>
      <option value="ANSWERED">Odpowiedziane</option>
      <option value="DELETED">Usunięte</option>
      <option value="RECENT">Stare</option>
      <option value="SEEN">Otworzone</option>
      <option value="DRAFT">Nie otwarte</option>
    </select>
  )
}

export default Filters
