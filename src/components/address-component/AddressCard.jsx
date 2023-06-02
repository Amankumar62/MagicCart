import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import "./AddressCard.css";
import { EditAddressModal } from "./EditAddressModal";

export const AddressCard = ({ hideAddressHandler }) => {
  const { address, selectAddressHandler, removeAddressHandler } =
    useContext(AuthContext);
  const [editAddress, setEditAddress] = useState(false);
  const [passingId, setPassingId] = useState();
  return (
    <>
      <div>
        <h2 className="checkout-address-header">Address Details</h2>
        {address.length === 0 ? (
          <p className="empty-address">No Address Added</p>
        ) : (
          <ul className="checkout-address-ul">
            {address.map((addressItem) => {
              const { id, active, name, user_address, pincode, mobile } =
                addressItem;
              return (
                <li key={id}>
                  <div style={{ display: !editAddress && "none" }}>
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={true}
                    >
                      <EditAddressModal
                        addressItemId={passingId}
                        setEditAddress={setEditAddress}
                      />
                    </Backdrop>
                  </div>
                  <input
                    type="radio"
                    name="address"
                    id={id}
                    checked={active}
                    onChange={() => selectAddressHandler(id)}
                  />
                  <label htmlFor={id}>
                    <h3>{name}</h3>
                    <p>{user_address}</p>
                    <span>Pincode:{pincode}</span>
                    <span>Mobile:{mobile}</span>
                  </label>
                  <section className="btn-section">
                    <button
                      className="btn-edit-address"
                      onClick={() => {
                        setEditAddress(true);
                        setPassingId(id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-remove-address"
                      onClick={() => removeAddressHandler(id)}
                    >
                      Remove
                    </button>
                  </section>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* <button
        className="checkout-add-address"
        onClick={() => hideAddressHandler(false)}
      >
        <AiOutlinePlusCircle />
        Add new Address
      </button> */}
    </>
  );
};
