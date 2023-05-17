import { useContext } from "react";
import { ProductCard } from "../components/ProductCard";
import "./Wishlist.css";
import { CartContext } from "../Context/CartContext";

export const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  return (
    <>
      <div className="wishlist-container">
        <h2 className="wishlist-heading">My Wishlist</h2>
        <ul className="wishlist-product-listing">
          {wishlist.map((product) => (
            <li>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
