import { ProductCard } from "../components/ProductCard";
import "./Wishlist.css";

export const Wishlist = () => {
  return (
    <>
      <div className="wishlist-container">
        <h2 className="wishlist-heading">My Wishlist</h2>
        <ul className="wishlist-product-listing">
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
          <li>
            <ProductCard />
          </li>
        </ul>
      </div>
    </>
  );
};
