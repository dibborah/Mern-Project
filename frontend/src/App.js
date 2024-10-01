import React from 'react'
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WebFont from 'webfontloader'
import Footer from './component/layout/Footer/Footer.js'
import Home from './component/Home/Home.js'
import './App.css'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'

const App = () => {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/product/:id' element={<ProductDetails/>} />
        <Route exact path='/products' element={<Products/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
