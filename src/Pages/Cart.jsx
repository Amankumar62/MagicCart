import { ProductCardLandscape } from "../components/ProductCardLandscape";
import "./Cart.css";
import { PriceCard } from "../components/PriceCard";
export const Cart = () => {
  return (
    <>
      <h2 className="cart-heading">My Cart(5)</h2>
      <div className="cart-detail">
        <div className="product-card-landscape-list">
          <ul>
            <li>
              <ProductCardLandscape />
            </li>
            <li>
              <ProductCardLandscape />
            </li>
            <li>
              <ProductCardLandscape />
            </li>
            <li>
              <ProductCardLandscape />
            </li>
          </ul>
        </div>
        <div className="price-card">
          <PriceCard />
        </div>
      </div>
    </>
  );
};
