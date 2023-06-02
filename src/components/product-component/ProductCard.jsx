import { useContext, useRef } from "react";
import "./ProductCard.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

export const ProductCard = ({ product }) => {
  const wishlistTimerId = useRef();
  const cartTimerId = useRef();
  const { addToCart, isProductInCart, isProductInWihlist, toggleWishlist } =
    useContext(CartContext);
  const { checkLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const success = (product, place, action = "Added") => {
    let preposition = "to";
    if (action === "Removed") {
      preposition = "from";
    }
    return toast.success(
      `${action} 1 ${product.description} ${preposition} ${place}`,
      {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      }
    );
  };
  const authCheckCart = (product, place) => {
    if (checkLogin()) {
      addToCart(product);
      if (
        isProductInWihlist(product._id) &&
        location?.pathname === "/wishlist"
      ) {
        toggleWishlist(product);
      }
      success(product, place);
    } else {
      navigate("/login", { state: location });
    }
  };
  const authCheckWishlist = (product, place) => {
    if (checkLogin()) {
      toggleWishlist(product);
      isProductInWihlist(product._id)
        ? success(product, place, "Removed")
        : success(product, place);
    } else {
      navigate("/login", { state: location });
    }
  };

  const debounceCartClick = (callback, delay, ...args) => {
    clearTimeout(cartTimerId.current);
    cartTimerId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
  const debounceWishlistClick = (callback, delay, ...args) => {
    clearTimeout(wishlistTimerId.current);
    wishlistTimerId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return (
    <>
      <img
        className="product-image"
        src={product.image}
        onClick={() => navigate(`/products/${product._id}`)}
        alt="pro banner"
        loading="lazy"
      />
      <button
        onClick={() =>
          debounceWishlistClick(authCheckWishlist, 600, product, "wishlist")
        }
        className="btn-wishlist"
      >
        <AiTwotoneHeart
          style={{
            color: isProductInWihlist(product._id) && checkLogin() ? "red" : "",
          }}
          className="btn-wishlist-icon"
        />
      </button>
      <span className="product-rating">{product.rating}/5</span>
      <span
        className="product-size"
        style={{ display: product.size !== "" ? "" : "none" }}
      >
        {product.size}
      </span>
      <section className="product-detail">
        <span className="product-name">{product.title}</span>
        <span className="product-price">
          {product.discounted_price}
          <span className="actual-price">{product.price}</span>
        </span>
        <span
          style={{
            color: product.availability ? "green" : "red",
            fontWeight: "800",
          }}
        >
          {product.availability ? "In Stock" : "Out of stock"}
        </span>
        <button
          onClick={() => debounceCartClick(authCheckCart, 600, product, "cart")}
          style={{
            display: isProductInCart(product._id) && checkLogin() ? "none" : "",
            backgroundImage: !product.availability && "none",
            backgroundColor: !product.availability && "#666",
            cursor: !product.availability && "default",
          }}
          className="btn-cart"
          disabled={!product.availability}
        >
          <BsCartFill />
          Add to Cart
        </button>
        <button
          className="btn-cart"
          onClick={() => navigate("/cart")}
          style={{
            display: isProductInCart(product._id) && checkLogin() ? "" : "none",
          }}
        >
          Go to Cart
        </button>
      </section>
    </>
  );
};
