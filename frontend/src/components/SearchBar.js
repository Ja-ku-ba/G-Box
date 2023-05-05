import React from 'react'

import search from '../icons/search.svg'

const SearchBar = () => {
  return (
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
        <div class="input-group-prepend">
            <button class="input-group-text" type='submit'>
              <img width="25px" src={search} alt="Search icon"></img>
            </button>
        </div>
    </div>
  )
}

export default SearchBar
