import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [currencies, setCurrencies] = useState([])

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
        const { data } = await axios.get('https://api.coincap.io/v2/assets') // * <-- replace with your endpoint
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

  return (
    <main className="container">
      <h1>Cryptocurrencies</h1>
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
            {currencies.map(currency => {
              // console.log(currency)
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
