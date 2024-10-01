import React, { Fragment, useEffect } from 'react'
import { CiDesktopMouse2 } from "react-icons/ci";
import './Home.css'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productActions.js';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';


const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {
        loading ? <Loader /> : (
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
                  <ProductCard product={product} key={product._id} />
                ))
              }
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Home;
