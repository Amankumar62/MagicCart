import { useContext } from "react";
import "./UserProfile.css";
import { AuthContext } from "../Context/AuthContext";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
import empty from "../animation/empty.json";
export const UserProfile = () => {
  const { user, orderHistory, logoutHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="profile-container">
        <div className="profile-details">
          <h2>Profile details</h2>
          <div className="profile-details-flex">
            <p>
              <b>Name:</b> {user?.firstName + " " + user?.lastName}
            </p>
            <p>
              <b>Email:</b>
              {user?.email}
            </p>
            <button onClick={() => logoutHandler()}>Logout</button>
          </div>
        </div>
        {orderHistory.length === 0 ? (
          <Lottie
            className="profile-empty-order"
            animationData={empty}
            loop={true}
          />
        ) : (
          <div className="order-history">
            <h2 className="order-history-heading">Order History</h2>
            <ul className="order-history-listing">
              {orderHistory.map(
                ({
                  paymentId,
                  totalAmount,
                  orderDate,
                  deliveryAddress,
                  cart,
                }) => (
                  <li key={paymentId} className="order-history-listing-li">
                    <span>
                      <b>Payment Id:</b>
                      {paymentId}
                    </span>
                    <span>
                      <b>Total amount:</b>{" "}
                      <span className="order-price">{totalAmount}</span>
                    </span>
                    <span>
                      <b>Date : </b>
                      {orderDate}
                    </span>
                    <span>
                      <b>Delivered to: </b>
                      {deliveryAddress.name}
                    </span>
                    <span>
                      <b>Delivery Address:</b>
                      {deliveryAddress.user_address}
                    </span>
                    <span>
                      <b>Delivery Pincode:</b>
                      {deliveryAddress.pincode}
                    </span>
                    <span>
                      <b>Ordered items:</b>
                    </span>
                    <ul className="order-history-listing-product">
                      {cart.map(
                        ({ _id, image, title, qty, description }, i) => (
                          <li
                            className="order-history-listing-li-product"
                            key={i}
                            onClick={() => navigate(`/products/${_id}`)}
                          >
                            <img src={image} alt={description} />
                            <div className="order-history-listing-li-product-detail">
                              <span>{title}</span>
                              <span>{description}</span>
                              <span>
                                Quantity:
                                {qty}
                              </span>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
