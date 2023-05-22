import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./AddressCard.css";

export const AddressCard = ({ hideAddressHandler }) => {
  const { address, selectAddressHandler, removeAddressHandler } =
    useContext(AuthContext);
  return (
    <>
      <h2 className="checkout-address-header">Address Details</h2>
      <div>
        {address.length === 0 ? (
          <p className="empty-address">No Address Added</p>
        ) : (
          <ul className="checkout-address-ul">
            {address.map(
              ({ id, active, name, user_address, pincode, mobile }) => (
                <li key={id}>
                  <input
                    type="radio"
                    name="address"
                    id={id}
                    checked={active}
                    onChange={() => selectAddressHandler(id)}
                  />
                  <label for={id}>
                    <h3>{name}</h3>
                    <p>{user_address}</p>
                    <span>Pincode:{pincode}</span>
                    <span>Mobile:{mobile}</span>
                  </label>
                  <button
                    className="btn-remove-address"
                    onClick={() => removeAddressHandler(id)}
                  >
                    Remove
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <button
        className="checkout-add-address"
        onClick={() => hideAddressHandler(false)}
      >
        <AiOutlinePlusCircle />
        Add new Address
      </button>
    </>
  );
};
