import { useContext } from "react";
import "./PriceCard.css";
import { CartContext } from "../Context/CartContext";
export const PriceCard = () => {
  const { getTotalPrice, getTotalDiscount, getCartCount } =
    useContext(CartContext);
  return (
    <>
      <h3>Price details</h3>
      <hr />
      <section>
        <ul className="price-detail-list">
          <li>
            <span>Price({getCartCount()} item)</span>
            <span className="price">{getTotalPrice()}</span>
          </li>
          <li>
            <span>Discount</span>
            <span>
              -<span className="price">{getTotalDiscount()}</span>
            </span>
          </li>
          <li>
            <span>Delivery Charges</span>
            <span className="price">{getTotalPrice() === 0 ? "0" : "249"}</span>
          </li>
          <hr />
          <li className="total-price">
            <span>Total amount</span>
            <span className="price">{getTotalPrice()}</span>
          </li>
        </ul>
      </section>
      <hr />
      <p className="saving-info">
        You will save {getTotalDiscount()} on this order
      </p>
      <button className="btn-place-order">Place Order</button>
    </>
  );
};
