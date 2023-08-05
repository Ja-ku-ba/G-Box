import { useNavigate, useParams } from "react-router-dom"

const SideFilters = () => {
  const { filter_link } = useParams()
  const navigate = useNavigate()
  const redirect = (filter) => {
    if (filter !== filter_link){
      navigate(`/${filter.target.id}`)
      window.location.reload(true);
    }
  }
  return (
    <div className="sidebar">
      <ul>
        <li onClick={(e) => redirect(e)} id="ALL">Odebrane</li>
        <li onClick={(e) => redirect(e)} id="FLAGGED">Oznaczone gwiazdką</li>
        <li onClick={(e) => redirect(e)} id="SENT">Wysłane</li>
        <li onClick={(e) => redirect(e)} id="DRAFT">Wersje robocze</li>
        <li onClick={(e) => redirect(e)} id="DELETED">Kosz</li>
        <li onClick={(e) => redirect(e)} id="SPAM">Spam</li>
      </ul>
    </div>
  );
};

export default SideFilters;
