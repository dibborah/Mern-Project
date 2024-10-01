import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Fragment, useEffect } from "react";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount } = useSelector(state => state.products);
    useEffect(() => {
        dispatch(getProduct());
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
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Products;
