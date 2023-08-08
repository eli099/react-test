import React from 'react'

const Filters = ({ filterCurrencies, filterList }) => {
  return (
    <div id="filters-container">
      <select name="filters" id="filters" onChange={filterCurrencies}>
        <option value="all">All Currencies</option>
        {filterList.map((type, index) => {
          return <option value={type} key={index}>{type}</option>
        })}
      </select>
    </div>
  )
}

export default Filters