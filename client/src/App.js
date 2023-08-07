import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  // ? Currency State
  const [currencies, setCurrencies] = useState([])

  const [filteredCurrencies, setFilteredCurrencies] = useState([])
  const [filterList, setFilterList] = useState([])

  // ? Application State
  // checking if there are errors
  const [errors, setErrors] = useState(false)
  // state to check if page is loading
  const [loading, setLoading] = useState(true)

  // ? useEffect below runs once on initial render (never again [unless reloaded])

  useEffect(() => {
    // get data from a promise based http client
    // the client is Axios
    const getData = async () => {

      try {
        // make a get request to the endpoint
        // await forces function to wait for the resolution before moving on
        const { data } = await axios.get('https://api.coincap.io/v2/rates') // * <-- replace with your endpoint
        console.log(data.data)
        setCurrencies(data.data)
      } catch (error) {
        console.log(error)
        setErrors(true)
      }
      // set loading to be fasle
      setLoading(false)
    }
    getData()
  }, []) // empty array in dependencies causes the useEffect to only trigger once on the first render

  // ? useEffect to generate unique list of types to add to dropdown
  useEffect(() => {
    // run only if currencies has items in it
    if (!currencies.length) return

    // create filter list
    // Create a filterArray variable to store currency types (fiat or crypto), without duplication
    const filterArray = []
    // Loop through currencies - each is checked to see if its type is already in filterArray
    // If present, we do nothing (''), if not present, it's added as a new type
    currencies.forEach(currency => filterArray.includes(currency.type) ? '' : filterArray.push(currency.type))
    // set filterList to be unique value (type) array
    setFilterList(filterArray)
  }, [currencies])

  // ? Function to trigger on change of the filter dropdown
  // Filter method to check value of the filter dropdown and return list of matching types of currency
  const filterCurrencies = (e) => {
    console.log('filterCurrencies e target ->', e.target.value)
    const filteredArray = currencies.filter(currency => currency.type === e.target.value)
    setFilteredCurrencies(filteredArray)
    console.log(filteredArray)
  }

  return (
    <main className="container">
      <h1>Currencies</h1>
      {/* Filter Dropdown */}


      <div id="filters-container">
        <select name="filters" id="filters" onChange={filterCurrencies}>
          <option value="all">All Currencies</option>
          {filterList.map((type, index) => {
            return <option value={type} key={index}>{type}</option>
          })}
        </select>
      </div>


      {loading ?
        <div className="loading">
          <p>Loading...</p>
        </div>
        :
        errors ?
          <div className="errors">
            <p>Currencies not loaded. Please try again.</p>
          </div>
          :
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
      }
    </main>
  )
}

export default App
