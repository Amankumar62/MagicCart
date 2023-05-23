import { ProductCardLandscape } from "../components/product-component/ProductCardLandscape";
import "./Cart.css";
import { PriceCard } from "../components/price-component/PriceCard";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
export const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <>
      <h2 className="cart-heading">
        Your Cart{cart.length === 0 ? "" : `(${cart.length})`}
      </h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-detail">
          <div className="product-card-landscape-list">
            <ul>
              {cart.map((product) => (
                <li className="product-card-landscape-list-listing">
                  <ProductCardLandscape product={product} />
                </li>
              ))}
            </ul>
          </div>
          <div className="price-card">
            <PriceCard />
          </div>
        </div>
      )}
    </>
  );
};
