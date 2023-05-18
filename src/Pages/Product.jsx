import { useLocation, useNavigate, useParams } from "react-router";
import "./Product.css";
import { useContext } from "react";
import { BsCartFill } from "react-icons/bs";
import { ProductContext } from "../Context/ProductContext";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
export const Product = () => {
  const { productId } = useParams();
  const { getProductDetail } = useContext(ProductContext);
  const { addToCart, toggleWishlist, isProductInCart, isProductInWihlist } =
    useContext(CartContext);
  const { checkLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const product = getProductDetail(productId);
  const {
    _id,
    image,
    title,
    description,
    price,
    discounted_price,
    rating,
    size,
    delivery_time,
    availability,
  } = product;
  const location = useLocation();
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
      <div key={_id} className="product-in-container">
        <img src={image} className="product-in-image" alt={description} />
        <div className="product-in-detail">
          <h2 className="product-in-title">{title}</h2>
          <p className="product-in-description">{description}</p>
          <p className="product-in-time">Delivery time: {delivery_time} Days</p>
          <span className="product-in-price">
            {discounted_price}
            <span className="product-in-discounted-price">{price}</span>
          </span>
          <span className="product-in-rating">{rating}/5</span>
          <span className="product-in-size">{size}</span>
          <span
            className="product-in-availability"
            style={{ color: !availability && "red" }}
          >
            {availability ? "In Stock" : "Out Of Stock"}
          </span>
          <button
            onClick={() => authCheckCart(product)}
            style={{
              display: isProductInCart(product._id) ? "none" : "",
            }}
            className="product-in-btn-cart"
          >
            <BsCartFill />
            Add to Cart
          </button>
          <button
            className="product-in-btn-cart"
            onClick={() => navigate("/cart")}
            style={{
              display: isProductInCart(product._id) ? "" : "none",
            }}
          >
            Go to Cart
          </button>
          <button
            onClick={() => authCheckWishlist(product)}
            className="product-in-btn-wishlist"
            style={{
              backgroundColor: isProductInWihlist(product._id) && "red",
            }}
          >
            {isProductInWihlist(product._id)
              ? "Remove From Wishlist"
              : "Move to Wishlist"}
          </button>
        </div>
      </div>
    </>
  );
};
