import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./Product.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
]

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector(state => state.products);

  const alert = useAlert();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  const keyword = params?.keyword;
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, currentPage, keyword, price, category, ratings, alert, error]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? <Loader />
        : (
          <Fragment>

            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h2 className="productsHeading">Products</h2>

            <div className="products">
              {
                products &&
                products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))
              }
            </div>

            <div className="filterBox">
              <Typography><span className="priceLabel">Price</span></Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />

              <Typography component="legend"><span className="categoriesLabel">Categories</span></Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <fieldset>
                <Typography component="legend"><span className="ratingsLabel">Ratings Above</span></Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </fieldset>
            </div>

            {
              (resultPerPage < count) && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount || 1}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )
            }

          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Products;
