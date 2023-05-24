import React from 'react'

import search from '../icons/search.svg'

const SearchBar = () => {
  return (
    <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
        <div className="input-group-prepend">
            <button className="input-group-text" type='submit'>
              <img width="25px" src={search} alt="Search icon"></img>
            </button>
        </div>
    </div>
  )
}

export default SearchBar
