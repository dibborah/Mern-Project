import React, { Fragment, useEffect } from 'react'
import { CiDesktopMouse2 } from "react-icons/ci";
import './Home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData.js';
import { getProduct } from '../../actions/productActions.js';
import { useSelector, useDispatch } from 'react-redux'


const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    state => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch])

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
        {
          products && products.map((product) => (
            <Product product={product}/>
          ))
        }

      </div>
    </Fragment>
  )
}

export default Home;
