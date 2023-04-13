import { object } from 'prop-types'
import React from 'react'

const BackendErrorMessages = ({ backendErrors }) => {
  console.log('backendErrors', backendErrors)
  const errorMessages = Object.keys(backendErrors).map((name) => {
    const messages = backendErrors[name].join(' ')
    return `${name} ${messages}`
  })
  console.log('errorMessagesr', errorMessages)
  return (
    <ul className="error-messages">
      {errorMessages.map((errorMessages) => (
        <li key={errorMessages}>{errorMessages}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages
