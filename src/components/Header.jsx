import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import "./Header.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

export const Header = () => {
  const { checkLogin } = useContext(AuthContext);
  const { getCartCount, getWishlistCount } = useContext(CartContext);
  return (
    <>
      <nav>
        <h1 className="header-name">
          <Link className="header-name-a" to="/">
            MagicCart
          </Link>
        </h1>
        <input className="search-input" type="text" placeholder="🔍 Search" />
        <div className="header-links">
          <Link to="/products">
            <button
              style={{ display: checkLogin() ? "" : "none" }}
              className="btn-header-login"
            >
              Explore
            </button>
          </Link>
          <Link to="/login">
            <button
              style={{ display: checkLogin() ? "none" : "" }}
              className="btn-header-login"
            >
              Login
            </button>
          </Link>
          <Link to="/wishlist" className="link-wishlist">
            <AiFillHeart className="link-wishlist-a" />
            <span
              style={{ display: getWishlistCount() === 0 ? "none" : "" }}
              className="badge"
              value={getWishlistCount()}
            ></span>
          </Link>
          <Link to="/cart" className="link-cart">
            <AiOutlineShoppingCart />
            <span
              style={{ display: getCartCount() === 0 ? "none" : "" }}
              className="badge"
              value={getCartCount()}
            ></span>
          </Link>
        </div>
      </nav>
    </>
  );
};
