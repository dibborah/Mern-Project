import React, { Fragment } from 'react'
import { CiDesktopMouse2 } from "react-icons/ci";
import './Home.css'

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZON PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CiDesktopMouse2 />
          </button>
        </a>
      </div>
    </Fragment>
  )
}

export default Home;
