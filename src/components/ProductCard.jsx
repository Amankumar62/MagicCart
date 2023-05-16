import "./ProductCard.css";
import { AiTwotoneHeart } from "react-icons/ai";
export const ProductCard = ({ message }) => {
  // const getButtonMessage = () =>{
  //   if(message === "")
  // }
  return (
    <>
      <img
        className="product-image"
        src="https://rukminim1.flixcart.com/image/612/612/k66sh3k0/jacket/a/k/u/m-9587613-roadster-original-imafzpbv8smzbquw.jpeg?q=70"
        alt="pro banner"
      />
      <button className="btn-wishlist">
        <AiTwotoneHeart className="btn-wishlist-icon" />
      </button>
      <section className="product-detail">
        <span className="product-name">Men Premium Jacket</span>
        <span className="product-price">2000</span>

        <button className="btn-cart">Add to Cart</button>
      </section>
    </>
  );
};
