import { useContext } from "react";
import "./ProductCard.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";

export const ProductCard = ({ product }) => {
  const { addToCart, isProductInCart, isProductInWihlist, toggleWishlist } =
    useContext(CartContext);
  const { checkLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const authCheckCart = (product) => {
    checkLogin() ? addToCart(product) : navigate("/login", { state: location });
  };
  const authCheckWishlist = (product) => {
    checkLogin()
      ? toggleWishlist(product)
      : navigate("/login", { state: location });
  };
  return (
    <>
      <img
        className="product-image"
        src={product.image}
        onClick={() => navigate(`/products/${product._id}`)}
        alt="pro banner"
      />
      <button
        onClick={() => authCheckWishlist(product)}
        className="btn-wishlist"
      >
        <AiTwotoneHeart
          style={{
            color: isProductInWihlist(product._id) ? "red" : "",
          }}
          className="btn-wishlist-icon"
        />
      </button>
      <span className="product-rating">{product.rating}/5</span>
      <span
        className="product-size"
        style={{ display: product.rating !== "" ? "" : "none" }}
      >
        {product.size}
      </span>
      <section className="product-detail">
        <span className="product-name">{product.title}</span>
        <span className="product-price">
          {product.discounted_price}{" "}
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
          onClick={() => authCheckCart(product)}
          style={{
            display: isProductInCart(product._id) ? "none" : "",
          }}
          className="btn-cart"
          disabled={isProductInCart(product._id) || !product.availability}
        >
          <BsCartFill />
          {isProductInCart(product._id) ? "Added To Cart" : "Add to Cart"}
        </button>
        <button
          className="btn-cart"
          onClick={() => navigate("/cart")}
          style={{
            display: isProductInCart(product._id) ? "" : "none",
          }}
        >
          Go to Cart
        </button>
      </section>
    </>
  );
};
