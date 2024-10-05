import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

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
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector(state => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  const keyword = params?.keyword;
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, currentPage, keyword, price, category]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? <Loader />
        : (
          <Fragment>
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
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />

              <Typography>Categories</Typography>
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
