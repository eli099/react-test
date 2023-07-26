import React, { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    const getData = async () => {
    
      try {
        const { data } = await axios.get('https://api.coincap.io/v2/rates') // * <-- replace with your endpoint
        console.log(data)
      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, []) // empty array in dependencies causes the useEffect to only trigger once on the first render

  return <h1>Hello World</h1>
}

export default App
