import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productReducer } from './reducers/productReducer';

const reducer = combineReducers({ // combines all the reducers
    products: productReducer,
    productDetails: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// "proxy": "http://172.22.208.1:4000"
// "proxy": "http://192.168.27.108:4000"
// "proxy": "http://192.168.27.108:4000"