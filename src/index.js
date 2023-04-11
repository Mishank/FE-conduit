import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from 'routes'
import TopBar from 'components/topBar'

const App = () => {
  return (
    <div>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
