import { useState, useEffect } from 'react'
import axios from 'axios'

import useLocalStorage from './useLocalStorage'

export default (url) => {
  const baseUrl = process.env.REACT_APP_HOST
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')
  console.log('token', token)

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? 'Token ${token}' : '',
        },
      },
    }
    if (!isLoading) {
      return
    }
    axios(baseUrl + url, requestOptions)
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
  }, [isLoading, options, url])
  return [{ isLoading, response, error }, doFetch]
}
