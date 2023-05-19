import { Link, NavLink } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineLogout,
} from "react-icons/ai";
import "./Header.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

export const Header = () => {
  const { checkLogin, logoutHandler } = useContext(AuthContext);
  const { getCartCount, getWishlistCount, addFilterQuery, searchQuery } =
    useContext(CartContext);
  const getActiveWishlist = ({ isActive }) => {
    return {
      color: isActive && "#991b1b",
    };
  };
  const getActiveCart = ({ isActive }) => {
    return {
      color: isActive && "#15803d",
    };
  };
  return (
    <>
      <nav>
        <h1 className="header-name">
          <Link className="header-name-a" to="/">
            MagicCart
          </Link>
        </h1>
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search"
          value={searchQuery}
          onChange={(e) => addFilterQuery(e)}
        />
        <div className="header-links">
          <Link to="/products">
            <button
              style={{
                display: checkLogin() ? "" : "none",
              }}
              className="btn-header-login explore"
            >
              Explore
            </button>
          </Link>
          <Link to="/login">
            <button
              style={{
                display: checkLogin() ? "none" : "",
              }}
              className="btn-header-login"
            >
              Login
            </button>
          </Link>

          <NavLink
            style={getActiveWishlist}
            to="/wishlist"
            className="link-wishlist"
          >
            <AiFillHeart className="link-wishlist-a" />
            <span
              style={{
                display:
                  getWishlistCount() === 0 || !checkLogin() ? "none" : "",
              }}
              className="badge"
              value={getWishlistCount()}
            ></span>
          </NavLink>
          <NavLink style={getActiveCart} to="/cart" className="link-cart">
            <AiOutlineShoppingCart />
            <span
              style={{
                display: getCartCount() === 0 || !checkLogin() ? "none" : "",
              }}
              className="badge"
              value={getCartCount()}
            ></span>
          </NavLink>
          <button
            style={{ display: checkLogin() ? "" : "none" }}
            className="btn-header-logout"
            onClick={() => logoutHandler()}
          >
            <AiOutlineLogout className="btn-header-logout-icon" />
          </button>
        </div>
      </nav>
    </>
  );
};
