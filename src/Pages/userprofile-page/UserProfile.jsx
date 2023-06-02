import { useContext } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
export const UserProfile = () => {
  const { user, logoutHandler } = useContext(AuthContext);
  const { resetCartContext } = useContext(CartContext);

  const abstractLogoutHandler = () => {
    resetCartContext();
    logoutHandler();
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="profile-container">
        <h2>Profile details</h2>
        <div className="profile-details">
          <p>
            <b>First Name:</b> {user?.firstName}
          </p>
          <p>
            <b>Last Name:</b> {user?.lastName}
          </p>
          <p>
            <b>Email:</b>
            {user?.email}
          </p>
          <div>
            <button
              className="profile-btn btn-order"
              onClick={() => navigate("/orders")}
            >
              orders
            </button>
            <button
              className="profile-btn btn-order"
              onClick={() => navigate("/address")}
            >
              Address
            </button>
            <button
              className="profile-btn"
              onClick={() => abstractLogoutHandler()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
