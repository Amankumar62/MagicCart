import "./ProductCard.css";
export const ProductCard = () => {
  return (
    <>
      <img
        className="product-image"
        src="https://rukminim1.flixcart.com/image/612/612/k66sh3k0/jacket/a/k/u/m-9587613-roadster-original-imafzpbv8smzbquw.jpeg?q=70"
        alt="pro banner"
      />
      <section className="product-detail">
        <span className="product-name">Men Premium Jacket</span>
        <span className="product-price">2000</span>
        <button className="btn-cart">Go to Cart</button>
      </section>
    </>
  );
};
