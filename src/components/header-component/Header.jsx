import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsFillBagCheckFill } from "react-icons/bs";
import "./Header.css";
import { useContext, useRef } from "react";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

export const Header = () => {
  const timerId = useRef();
  const { checkLogin } = useContext(AuthContext);
  const { getCartCount, getWishlistCount, addFilterQuery, clearCategory } =
    useContext(CartContext);
  const navigate = useNavigate();
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

  const searchHandler = (e) => {
    navigate("/products");
    addFilterQuery(e);
  };
  const debounceSearch = (callback, e, delay) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => callback(e), delay);
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
          placeholder="Search"
          onChange={(e) => debounceSearch(searchHandler, e, 500)}
        />
        <div className="header-links">
          <Link to="/products">
            <button
              className="btn-header-login explore"
              onClick={() => clearCategory()}
            >
              Explore
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
            <BsFillBagCheckFill />
            <span
              style={{
                display: getCartCount() === 0 || !checkLogin() ? "none" : "",
              }}
              className="badge"
              value={getCartCount()}
            ></span>
          </NavLink>
          <button
            // style={{ display: checkLogin() ? "" : "none" }}
            className="btn-header-logout"
            // onClick={() => logoutHandler()}
            onClick={() => navigate("/profile")}
          >
            {/* <AiOutlineLogout className="btn-header-logout-icon" /> */}
            <CgProfile className="btn-header-logout-icon" />
          </button>
        </div>
      </nav>
    </>
  );
};
