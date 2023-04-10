import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from 'routes'

const App = () => {
  return (
    <div>
      <h3>Welcome to hooks</h3>

      <Router>
        <Routes />
      </Router>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
