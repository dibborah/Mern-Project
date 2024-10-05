import { Fragment, useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData.js";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const [value, setValue] = useState(1);
  const { products, loading, error } = useSelector(state => {
    return state.productDetails;
  })

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    value: products.ratings,
    isHalf: true,
  };

  const handleChange = () => {
    setValue(value)
  }
  return (
    <Fragment>
      {
        loading ? <Loader /> : (
          <Fragment>
            <MetaData title={`${products.name} -- ECOMMERCE`} />
            <div className="ProductDetails">
              <div>
                <Carousel>
                  {
                    products.images &&
                    products.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        src={item.url}
                        key={item.url}
                        alt={`${i} Slide`}
                      />
                    ))
                  }
                </Carousel>
              </div>

              <div>
                <div className="detailsBlock-1">
                  <h2>{products.name}</h2>
                  <p>Product # {products._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span>({products.numOfReviews} Reviews )</span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`$${products.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={() => {
                        if (value === 0) return;
                        setValue(value - 1)
                      }}>-</button>
                      <input value={value} type="number" onChange={handleChange} />
                      <button onClick={() => setValue(value + 1)}>+</button>
                    </div>
                    <button>Add to Cart</button>
                  </div>

                  <p>
                    Status:
                    <b className={products.Stock < 1 ? "redColor" : "greenColor"}>
                      {products.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description: <p>{products.description}</p>
                </div>

                <button className="submitReview">Submit Review</button>
              </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>
            {products.reviews && products.reviews[0] ? (
              <div className="reviews">
                {products.reviews &&
                  products.reviews.map((review) => <ReviewCard review={review} key={review._id} />)
                }
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Fragment>
        )
      }
    </Fragment>

  )
}

export default ProductDetails;


