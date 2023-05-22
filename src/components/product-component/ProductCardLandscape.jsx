import { useContext } from "react";
import "./ProductCardLandscape.css";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
export const ProductCardLandscape = ({ product }) => {
  const { title, image, discounted_price, price } = product;
  const {
    removeFromCart,
    toggleWishlist,
    updateQuantityCart,
    isProductInWihlist,
  } = useContext(CartContext);

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
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      }
    );
  };
  const authCheckCart = (product, place) => {
    removeFromCart(product);
    success(product, place, "Removed");
  };
  const authCheckWishlist = (product, place) => {
    toggleWishlist(product);
    isProductInWihlist(product._id)
      ? success(product, place, "Removed")
      : success(product, place);
  };

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
          onClick={() => authCheckCart(product, "cart")}
          className="product-detail-landscape-btn-remove"
        >
          Remove From Cart
        </button>
        <button
          onClick={() => authCheckWishlist(product, "wishlist")}
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
