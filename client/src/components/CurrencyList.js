import React from 'react'

const CurrencyList = ({ filteredCurrencies, currencies }) => {
  return (
    <div className="currency-container">
      {(filteredCurrencies.length > 0 ? filteredCurrencies : currencies).map(currency => {
        const { id, name, symbol, type, rateUsd, rank, explorer } = currency
        return (
          <div className='card' key={id}>
            <div className="card-header">
              {name} ({symbol}) / Type: {type}
            </div>
            <div className="card-info">
              1 {symbol} = ${rateUsd}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CurrencyList