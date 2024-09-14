import React, { Fragment } from 'react'
import { CiDesktopMouse2 } from "react-icons/ci";
import './Home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData.js';

const product = {
  name: 'Blue Tshirt',
  images: [{ url: 'https://i.ibb.co/DRST11n/1.webp'}],
  price: '₹3000',
  _id: 'abhishek',
}

const Home = () => {
  return (
    <Fragment>
      <MetaData title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZON PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CiDesktopMouse2 />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  )
}

export default Home;
