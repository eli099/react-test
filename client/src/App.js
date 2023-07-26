import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [ currencies, setCurrencies ] = useState([])

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
      }

    }
    getData()
  }, []) // empty array in dependencies causes the useEffect to only trigger once on the first render

  return (
    <main className="container">
      <h1>Currencies</h1>
      <ul>
        {currencies.map(currency => {
          // console.log(currency)
          const { id, symbol, currencySymbol, type, rateUsd } = currency
          return <li key={id}>{id} ({symbol}) | {currencySymbol}1 = ${rateUsd} / Type: {type}</li>
        })}
      </ul>
    </main>
  )
}

export default App
