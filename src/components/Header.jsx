import { Link } from "react-router-dom";
import Home from "./Header.css";

export const Header = () => {
  return (
    <>
      <nav>
        <h1 className="header-name">Header</h1>
        <input
          className="search-input"
          type="text"
          placeholder="seacrh-icon Search"
        />
        <div className="header-links">
          <button className="btn-header-login">
            <Link to="/login">Login</Link>
          </button>
          <Link to="/wishlist" className="link-wishlist">
            Wishlist
          </Link>
          <Link to="/cart" className="link-cart">
            Cart
          </Link>
        </div>
      </nav>
    </>
  );
};
