import React from 'react'
import './Search.css'
import PropTypes from 'prop-types'

function Search(props) {
  return (
    <form className='filter-form container searchForm'>
      <div className='input-group input-group'>
        <input
          placeholder='ძებნა'
          type='text'
          className='form-control smallSearchInput'
          id='search'
          value={props.searchValue}
          onChange={props.handleSearch}
        />
      </div>
    </form>
  )
}


Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default Search
