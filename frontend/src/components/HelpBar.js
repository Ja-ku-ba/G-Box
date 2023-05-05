import { React } from 'react'

import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'

const HelpBar = () => {
  return (
    <div className='HelpBar inbox-list'>
      <ol className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-start inbox-list-box">
          <Filters />
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start inbox-list-box">
          <SearchBar />
        </li>
      </ol>
    </div>
  )
}

export default HelpBar
