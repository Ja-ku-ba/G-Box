import { useNavigate, useParams } from "react-router-dom"

const SideFilters = () => {
  const { filter_link } = useParams()
  const navigate = useNavigate()
  const redirect = (filter) => {
    if (filter !== filter_link) {
      navigate(`/${filter.target.id}`)
      window.location.reload(true)
    }
  }
  return (
    <div className="sidebar">
      <ul>
        <li onClick={(e) => redirect(e)} id="ALL">
          Wszystkie odebrane
        </li>
        <li onClick={(e) => redirect(e)} id="UNSEEN">
          Ostatnie
        </li>
        <li onClick={(e) => redirect(e)} id="SEEN">
          Wyświetlone
        </li>
        <li onClick={(e) => redirect(e)} id="ANSWERED">
          Odpowiedzi
        </li>
        <li onClick={(e) => redirect(e)} id="FLAGGED">
          Oznaczone gwiazdką
        </li>
        <li onClick={(e) => redirect(e)} id="SENT">
          Wysłane
        </li>
      </ul>
    </div>
  )
}

export default SideFilters
