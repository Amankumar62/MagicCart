import "./ProductCard.css";
import { AiTwotoneHeart } from "react-icons/ai";
export const ProductCard = ({ product }) => {
  // const getButtonMessage = () =>{
  //   if(message === "")
  // }
  return (
    <>
      <img className="product-image" src={product.image} alt="pro banner" />
      <button className="btn-wishlist">
        <AiTwotoneHeart className="btn-wishlist-icon" />
      </button>
      <section className="product-detail">
        <span className="product-name">{product.title}</span>
        <span className="product-price">{product.discounted_price}</span>

        <button className="btn-cart">Add to Cart</button>
      </section>
    </>
  );
};
