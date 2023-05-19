import { useContext } from "react";
import "./PriceCard.css";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router";
export const PriceCard = () => {
  const { getTotalPrice, getTotalDiscount, cart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <>
      <h3>Order details</h3>
      <hr />
      <section>
        <ul className="price-detail-list">
          {cart.length === 0 ? (
            <p>No Product Added</p>
          ) : (
            <ul className="price-detail-list">
              {cart.map(({ title, discounted_price, qty }) => (
                <li>
                  <span>
                    {title}({qty})
                  </span>
                  <span className="price">{discounted_price}</span>
                </li>
              ))}
            </ul>
          )}
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
            <span className="price">
              {getTotalPrice() === 0 ? "0" : getTotalPrice() + 249}
            </span>
          </li>
        </ul>
      </section>
      <hr />
      <p className="saving-info">
        You will save {getTotalDiscount()} on this order
      </p>
      <button className="btn-place-order" onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    </>
  );
};
