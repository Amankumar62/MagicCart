import "./ProductCardLandscape.css";
export const ProductCardLandscape = () => {
  return (
    <>
      <img
        src="https://rukminim1.flixcart.com/image/612/612/k66sh3k0/jacket/a/k/u/m-9587613-roadster-original-imafzpbv8smzbquw.jpeg?q=70"
        alt="landscape"
        className="product-card-landscape-image"
      />
      <section className="product-detail-landscape">
        <h3 className="product-detail-landscape-name">Mens Jacket</h3>
        <p className="product-detail-landscape-price">
          2000<span>3999</span>
        </p>
        <span className="product-detail-landscape-discount">50% off</span>
        <div className="product-detail-landscape-quantity">
          <label htmlFor="quantity">Quantity:</label>
          <span>
            <button>-</button>
            <input type="text" name="quantity" disabled={true} value="1" />
            <button>+</button>
          </span>
        </div>
        <button className="product-detail-landscape-btn-remove">
          Remove From Cart
        </button>
        <button className="product-detail-landscape-btn-wishlist">
          Move to Wishlist
        </button>
      </section>
    </>
  );
};
