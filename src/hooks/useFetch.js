import { useState, useEffect } from 'react'
import axios from 'axios'

export default (url) => {
  const baseUrl = process.env.REACT_APP_HOST
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }

  useEffect(() => {
    if (!isLoading) {
      return
    }
    axios(baseUrl + url, options)
      .then((res) => {
        console.log('success', res)
        setResponse(res.data)
      })
      .catch((error) => {
        console.log('error', error)
        setError(error.response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [isLoading])
  return [{ isLoading, response, error }, doFetch]
}
