import { useContext } from "react";
import "./ProductCardLandscape.css";
import { CartContext } from "../Context/CartContext";
export const ProductCardLandscape = ({ product }) => {
  const { title, image, discounted_price, price } = product;
  const {
    removeFromCart,
    toggleWishlist,
    updateQuantityCart,
    isProductInWihlist,
  } = useContext(CartContext);
  return (
    <>
      <img
        src={image}
        alt="landscape"
        className="product-card-landscape-image"
      />
      <section className="product-detail-landscape">
        <h3 className="product-detail-landscape-name">{title}</h3>
        <p className="product-detail-landscape-price">
          {discounted_price}
          <span>{price}</span>
        </p>
        <span className="product-detail-landscape-discount">50% off</span>
        <div className="product-detail-landscape-quantity">
          <label htmlFor="quantity">Quantity:</label>
          <span>
            <button
              onClick={() => updateQuantityCart(product, "decrement")}
              disabled={product.qty === 1}
            >
              -
            </button>
            <input
              type="text"
              name="quantity"
              disabled={true}
              value={product.qty}
            />
            <button onClick={() => updateQuantityCart(product, "increment")}>
              +
            </button>
          </span>
        </div>
        <button
          onClick={() => removeFromCart(product)}
          className="product-detail-landscape-btn-remove"
        >
          Remove From Cart
        </button>
        <button
          onClick={() => toggleWishlist(product)}
          style={{
            backgroundColor: isProductInWihlist(product._id) ? "#666" : "",
          }}
          className="product-detail-landscape-btn-wishlist"
        >
          {isProductInWihlist(product._id)
            ? "Added to Wishlist"
            : "Move to Wishlist"}
        </button>
      </section>
    </>
  );
};
