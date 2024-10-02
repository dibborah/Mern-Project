import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';

const Products = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products);
    const setCurrentPageNo = (e) => {
      setCurrentPage(e);
    }
    useEffect(() => {
        dispatch(getProduct(params?.keyword));
    }, [dispatch]);
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
                        
                        <div className="paginationBox">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
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
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Products;
