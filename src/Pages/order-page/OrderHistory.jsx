import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./OrderHistory.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
import empty from "../../animation/empty.json";
export const OrderHistory = () => {
  const { orderHistory } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="order-history">
        <h2 className="order-history-heading">Your Orders</h2>
        {orderHistory.length === 0 ? (
          <Lottie
            className="profile-empty-order"
            animationData={empty}
            loop={true}
          />
        ) : (
          <ul className="order-history-listing">
            {orderHistory.map(
              ({
                orderId,
                paymentId,
                orderDate,
                deliveryAddress,
                totalAmount,
                cart,
              }) => (
                <li className="order-history-listing-li">
                  <h3>Order ID: {orderId}</h3>
                  <p>Order date:{orderDate.slice(0, 16)}</p>
                  <hr />
                  <ol>
                    {cart.map(
                      ({ _id, image, title, price, description, qty }) => (
                        <li
                          className="order-cart-item"
                          key={_id}
                          onClick={() => navigate(`/products/${_id}`)}
                        >
                          <img src={image} alt={description} />
                          <div className="order-cart-item-div">
                            <div>
                              <p>{title}</p>
                              <p>{description}</p>
                              <span className="order-item-quantity">
                                Qty:{qty}
                              </span>
                            </div>
                            <p className="order-cart-item-price">{price}</p>
                          </div>
                        </li>
                      )
                    )}
                  </ol>
                  <hr />
                  <div className="payment-address-div">
                    <section>
                      <h4>Payment</h4>
                      <p>Payment ID : {paymentId}</p>
                      <p>
                        Amount Paid :{" "}
                        <span className="payment-amount-paid">
                          {totalAmount}
                        </span>
                      </p>
                    </section>
                    <section>
                      <h4>Delivery</h4>
                      <span>Address</span>
                      <p>{deliveryAddress?.name}</p>
                      <p>{deliveryAddress?.user_address}</p>
                      <p>Pincode:{deliveryAddress?.pincode}</p>
                      <p>Contact No:{deliveryAddress?.mobile}</p>
                    </section>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};
