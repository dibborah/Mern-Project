import React from 'react'
import Header from './component/layout/Header.js'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header />
    </Router>
  )
}

export default App;
