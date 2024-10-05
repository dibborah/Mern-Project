import React, { Fragment, useEffect } from 'react'
import { CiDesktopMouse2 } from "react-icons/ci";
import './Home.css'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productActions.js';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products, productsCount } = useSelector(
    state => state.products
  );

  useEffect(() => {
    if (error) {
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

            {/* The React Navbar not displying the other icons issue solved here. This is just a temporary work-around. */}
            {/* Later an new custom navbar component would be create to replace this icons block and shifting it to the navbar as per our design flow */}

            <div className='icons'>
              <div
                className='searchIcon'
                onClick={() => navigate("/search")}
              >
                <FaSearch />
              </div>
              <div
                className='cartIcon'
                onClick={() => null}
              >
                <FaShoppingCart />
              </div>
              <div
                className='profileIcon'
                onClick={() => navigate("/login")}
              >
                <CgProfile />
              </div>
            </div>

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
