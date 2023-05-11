import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import Home from "./Header.css";

export const Header = () => {
  return (
    <>
      <nav>
        <h1 className="header-name">MagicCart</h1>
        <input className="search-input" type="text" placeholder="🔍 Search" />
        <div className="header-links">
          <Link to="/login">
            <button className="btn-header-login">Login</button>
          </Link>
          <Link to="/wishlist" className="link-wishlist">
            <AiFillHeart className="link-wishlist-a" />
            <span className="badge" value="6"></span>
          </Link>
          <Link to="/cart" className="link-cart">
            <AiOutlineShoppingCart />
            <span className="badge" value="5"></span>
          </Link>
        </div>
      </nav>
    </>
  );
};
