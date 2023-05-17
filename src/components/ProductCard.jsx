import { useContext } from "react";
import "./ProductCard.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

export const ProductCard = ({ product }) => {
  const { addToCart, addToWishList } = useContext(CartContext);
  const { checkLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const authCheck = (product) => {
    console.log(checkLogin());
    checkLogin() ? addToCart(product) : navigate("/login");
  };
  return (
    <>
      <img className="product-image" src={product.image} alt="pro banner" />
      <button onClick={() => addToWishList(product)} className="btn-wishlist">
        <AiTwotoneHeart className="btn-wishlist-icon" />
      </button>
      <section className="product-detail">
        <span className="product-name">{product.title}</span>
        <span className="product-price">{product.discounted_price}</span>

        <button onClick={() => authCheck(product)} className="btn-cart">
          Add to Cart
        </button>
      </section>
    </>
  );
};
