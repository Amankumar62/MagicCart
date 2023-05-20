import { useContext } from "react";
import "./PriceCard.css";
import { CartContext } from "../Context/CartContext";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
export const PriceCard = () => {
  const { getTotalPrice, getTotalDiscount, cart } = useContext(CartContext);
  const { address } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Failed to load");
      return;
    }

    const options = {
      key: "rzp_test_Hxp9VHO0sL1wfr",
      currency: "INR",
      amount: (amount + 249) * 100,
      name: "Magiccart",
      description: "Thanks for purchasing",
      image: "https://ibb.co/y6rmjhR",
      handler: function (response) {
        alert(response);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const orderAuthHandler = (amount) => {
    if (address.length !== 0 && address.find(({ active }) => active)) {
      displayRazorpay(amount);
      return;
    } else {
      alert("Select address to place order");
    }
  };

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
      <button
        style={{ display: location?.pathname === "/checkout" ? "" : "none" }}
        className="btn-place-order"
        onClick={() => orderAuthHandler(getTotalPrice())}
      >
        Place Order
      </button>
      <button
        style={{ display: location?.pathname === "/cart" ? "" : "none" }}
        className="btn-place-order"
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </>
  );
};
