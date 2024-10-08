import { Fragment, useState } from "react";
import './Search.css';
import { useNavigate as useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();
    const searchSearchHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history('/products');
        }
    };
    return (
        <Fragment>
            <MetaData title="Search A Product --- ECOMMERCE" />
            <form onSubmit={searchSearchHandler} className="searchBox">
              <input
                type="text"
                placeholder="Search a Product..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value='Search' />
            </form>
        </Fragment>
    )
}

export default Search;
