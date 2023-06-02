import { useContext } from "react";
import { ProductCard } from "../../components/product-component/ProductCard";
import "./Wishlist.css";
import { CartContext } from "../../Context/CartContext";

export const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  return (
    <>
      <div className="wishlist-container">
        <h2 className="wishlist-heading">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="empty-wishlist">
            You don't have any product inside your wishlist
          </p>
        ) : (
          <ul className="wishlist-product-listing">
            {wishlist.map((product) => (
              <li>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
